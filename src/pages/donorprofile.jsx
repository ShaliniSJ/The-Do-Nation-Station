import Navbar from "@/src/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/src/lib/appwrite";

export default function Page() {
  const router = useRouter();
  const [donor, setDonor] = useState(null);
  const [pastContributions, setPastContributions] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (typeof window !== "undefined") {
        const islogged = localStorage.getItem("islogged");
        setIsLogged(islogged === "true");

        if (islogged === "true") {
          try {
            const user = await getCurrentUser(true);
            console.log("---------------------------");
            console.log(user);
            console.log("---------------------------");
            setDonor({
              name: user.name,
              total_amount: user.total_amount || 0, // Adjust based on your data structure
              user_id: user.user_id,
              //avatar_url: user.avatar_url,
            });
            // Fetch past contributions
            // Assuming you have a function to get past contributions
            // TODO WE DONT HAVE THIS YET
            //const contributions = await getPastContributions(user.user_id);
            //setPastContributions(contributions);
          } catch (error) {
            console.error("Failed to fetch user data", error);
          }
        }
      }
    };

    fetchUserData();
  }, []);

  const contributionsList = [];
  pastContributions.forEach((contrib) => {
    contributionsList.push(
      <li className="flex flex-row py-2 items-center gap-32 border-b-2 border-black/10">
        <div className="flex flex-col">
          <p className="text-xl">{contrib.name}</p>
          <p>{contrib.updated_at}</p>
        </div>
        <p className="text-xl text-green-500">+{contrib.donation_amt}</p>
      </li>
    );
  });

  // useEffect(() => {
  //   setDonor(donor);
  //   console.log("donor", donor);
  // }, [router.query.slug]);

  return (
    <>
      <Navbar islogged={isLogged} />
      <div className="flex flex-col min-h-[80vh] md:flex-row gap-4 md:gap-16">
        {donor ? (
          <>
            <div className="flex flex-col bg-blue-200/50 gap-8 p-6 md:pr-16">
              <div className="flex flex-row items-center gap-8">
                <img
                  className="w-32 h-32 rounded-full"
                  //src={donor.avatar_url}
                  alt={donor.name}
                />
                <div className="flex flex-col">
                  <p className="text-2xl">{donor.name}</p>
                  <p className="text-xl opacity-80">{donor.user_id}</p>
                </div>
              </div>

              <div className="flex flex-row gap-2">
                <div className="bg-yellow-100 rounded-md p-2 w-fit">
                  <p className="text-xl">Points: +{donor.total_amount}</p>
                </div>
                <div className="bg-green-100 rounded-md p-2 w-fit">
                  <p className="text-xl">Rank: 30</p> {/*TODO*/}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-8 grow p-6">
              <h3 className="text-3xl font-bold">Past Contributions</h3>
              <ul className="flex flex-col gap-4 w-full">
                {contributionsList}
              </ul>
            </div>
          </>
        ) : (
          <p>Loading profile</p>
        )}
      </div>
    </>
  );
}
