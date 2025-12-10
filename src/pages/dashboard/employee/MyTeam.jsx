import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/ui/Spinner";
import { FaBirthdayCake } from "react-icons/fa";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all team members (from all affiliated companies)
  const { data: teamData = [], isLoading } = useQuery({
    queryKey: ['my-team'],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-team');
      return res.data;
    }
  });

  // Get upcoming birthdays (current month)
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = teamData
    .filter(member => {
      if (!member.dateOfBirth) return false;
      const dob = new Date(member.dateOfBirth);
      return dob.getMonth() === currentMonth;
    })
    .slice(0, 5);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gradient">My Team</h1>

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="bg-base-100 p-6 rounded-xl shadow-lg border border-primary/10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaBirthdayCake className="text-primary text-2xl" />
            <span className="text-base-content/80">Upcoming Birthdays (This Month)</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingBirthdays.map((member) => (
              <div key={member._id} className="flex items-center gap-3 p-4 bg-base-200/50 rounded-lg">
                <img
                  src={member.profileImage || 'https://via.placeholder.com/40'}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <p className="font-semibold text-sm">{member.name}</p>
                  <p className="text-xs text-base-content/60">
                    {new Date(member.dateOfBirth).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Members Grid */}
      <h2 className="text-xl font-bold mt-8">Team Members</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamData.map((member) => (
          <div key={member._id} className="bg-base-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
            <img
              src={member.profileImage || 'https://via.placeholder.com/100'}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-base-200"
            />
            <h3 className="font-bold text-lg mb-1">{member.name}</h3>
            <div className="text-primary/80 font-medium text-sm mb-4">Team Member</div>

            {member.email && (
              <p className="text-sm text-base-content/60 bg-base-200/50 py-2 rounded-lg truncate px-2">
                {member.email}
              </p>
            )}
          </div>
        ))}
      </div>

      {teamData.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/70">No team members found</p>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
