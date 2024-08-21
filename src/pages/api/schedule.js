import cron from "node-cron";
import { getNeedsTable, updateNeed } from "../../lib/appwrite"; 

function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
  const formatTodayDateToDDMMYYYY = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Ensures 2 digits for day
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Ensures 2 digits for month (January is 0)
    const year = today.getFullYear();
  
    return `${year}-${month}-${day}`;
  };
  
const scheduleTask = () => {
  cron.schedule("0 0 * * *", async () => {
  

    try {
      
      const needs = await getNeedsTable();

      const today = formatTodayDateToDDMMYYYY(); 
      console.log("Today",today);
      // Filter the needs where the date matches today and completed is false
      const needsToUpdate = needs.filter(
        
        (need) => {
            console.log("others Date",formatDate(need.date));
            
            return formatDate(need.date) === today && !need.completed;
        }
      );
      console.log(needsToUpdate);
      // Update each matching need
      for (const need of needsToUpdate) {
        
        await updateNeed(need.$id, { completed: true });
      }

    //   console.log("Task completed successfully.");
    } catch (error) {
      console.error("Error running scheduled task:", error.message);
    }
  });
};

export default function handler(req, res) {
  scheduleTask();
  
  res.status(200).json({ message: "Scheduler is running" });
}
