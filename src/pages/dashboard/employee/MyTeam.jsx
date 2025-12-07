import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Spinner from "../../../components/ui/Spinner";
import { FaBirthdayCake } from "react-icons/fa";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedCompany, setSelectedCompany] = useState("");

  const { data: affiliations = [] } = useQuery({
    queryKey: ['affiliations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/affiliations');
      return res.data;
    }
  });

  const { data: teamData = [], isLoading } = useQuery({
    queryKey: ['team', selectedCompany],
    queryFn: async () => {
      if (!selectedCompany) return [];
      const res = await axiosSecure.get(`/team/${selectedCompany}`);
      return res.data;
    },
    enabled: !!selectedCompany
  });

  // Get unique companies
  const companies = [...new Set(affiliations.map(a => a.companyName))];

  // Get upcoming birthdays (current month)
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = teamData
    .filter(member => {
      if (!member.employeeDetails?.dateOfBirth) return false;
      const dob = new Date(member.employeeDetails.dateOfBirth);
      return dob.getMonth() === currentMonth;
    })
    .slice(0, 5);

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gradient">My Team</h1>

      {/* Company Selector */}
      {companies.length > 0 && (
        <div>
          <label className="label">
            <span className="label-text font-semibold">Select Company</span>
          </label>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select a company</option>
            {companies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
      )}

      {!selectedCompany && (
        <div className="text-center py-12 bg-base-100 rounded-xl">
          <p className="text-base-content/70">Please select a company to view team members</p>
        </div>
      )}

      {selectedCompany && (
        <>
          {/* Upcoming Birthdays */}
          {upcomingBirthdays.length > 0 && (
            <div className="bg-base-100 p-6 rounded-xl shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FaBirthdayCake className="text-primary" />
                Upcoming Birthdays (This Month)
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingBirthdays.map((member) => (
                  <div key={member._id} className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                    <img
                      src={member.employeeDetails?.profileImage || 'https://via.placeholder.com/40'}
                      alt={member.employeeName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{member.employeeName}</p>
                      <p className="text-xs text-base-content/70">
                        {new Date(member.employeeDetails?.dateOfBirth).toLocaleDateString('en-US', {
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

          {/* Team Members */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamData.map((member) => (
              <div key={member._id} className="bg-base-100 p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.employeeDetails?.profileImage || 'https://via.placeholder.com/60'}
                    alt={member.employeeName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{member.employeeName}</h3>
                    <p className="text-sm text-base-content/70">{member.employeeEmail}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-semibold">Join Date:</span> {new Date(member.affiliationDate).toLocaleDateString()}
                  </p>
                  {member.employeeDetails?.phoneNumber && (
                    <p className="text-sm">
                      <span className="font-semibold">Phone:</span> {member.employeeDetails.phoneNumber}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {teamData.length === 0 && (
            <div className="text-center py-12">
              <p className="text-base-content/70">No team members found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyTeam;

