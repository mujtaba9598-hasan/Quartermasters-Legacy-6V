"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Briefcase, Calendar, Target, Activity } from "lucide-react";

export default function PortalDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState({
    projects: [] as any[],
    bookings: [] as any[],
    interactions: [] as any[],
    score: null as any,
    contact: null as any,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const [
          { data: contactData },
          { data: projectsData },
          { data: bookingsData },
          { data: scoreData },
          { data: interactionsData }
        ] = await Promise.all([
          supabase.from('contacts').select('*').eq('id', user.id).single(),
          supabase.from('projects').select('*').eq('client_id', user.id),
          supabase.from('bookings').select('*').eq('attendee_email', user.email).order('start_time', { ascending: true }),
          supabase.from('lead_scores').select('*').eq('contact_id', user.id).single(),
          supabase.from('interactions').select('*').eq('contact_id', user.id).order('created_at', { ascending: false }).limit(5)
        ]);

        setData({
          contact: contactData,
          projects: projectsData || [],
          bookings: bookingsData || [],
          score: scoreData,
          interactions: interactionsData || []
        });
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="w-8 h-8 rounded-full border-4 border-[#C15A2C] border-t-transparent animate-spin"></div>
      </div>
    );
  }

  const activeProjects = data.projects.filter(p => !['completed', 'archived'].includes(p.status)).length;
  const upcomingBookings = data.bookings.filter(b => new Date(b.start_time) > new Date()).slice(0, 3);
  const currentScore = data.score?.score || 0;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#002147] to-[#001429] border border-white/10 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C15A2C]/20 blur-[80px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2 font-heading">
            Welcome back, <span className="text-[#C15A2C]">{user?.user_metadata?.full_name?.split(' ')[0] || "Client"}</span>
          </h1>
          <p className="text-white/60 text-lg">{data.contact?.company ? `Manage your engagements for ${data.contact.company}` : "Manage your projects and deliverables."}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#C15A2C]/20 transition-colors text-[#C15A2C]">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{activeProjects}</p>
          <p className="text-sm font-medium text-white/50 uppercase tracking-wider">Active Projects</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#C15A2C]/20 transition-colors text-[#C15A2C]">
              <Calendar className="w-6 h-6" />
            </div>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{upcomingBookings.length}</p>
          <p className="text-sm font-medium text-white/50 uppercase tracking-wider">Upcoming Meetings</p>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-xl group-hover:bg-[#C15A2C]/20 transition-colors text-[#C15A2C]">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-white mb-1">{currentScore}</p>
            <div className="flex-1 max-w-[100px] h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${currentScore > 60 ? 'bg-green-500' : currentScore >= 30 ? 'bg-yellow-500' : 'bg-[#C15A2C]'}`}
                style={{ width: `${Math.min(100, currentScore)}%` }}
              />
            </div>
          </div>
          <p className="text-sm font-medium text-white/50 uppercase tracking-wider">Engagement Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Bookings */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#C15A2C]" />
            Upcoming Agenda
          </h2>

          {upcomingBookings.length > 0 ? (
            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium">{booking.cal_event_type || 'Consultation'}</h3>
                      <p className="text-sm text-white/50 mt-1">
                        {new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(booking.start_time))}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded-md bg-white/5 text-white/70 border border-white/10">
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl border border-dashed border-white/10">
              <p className="text-white/50">No upcoming meetings scheduled.</p>
            </div>
          )}
        </div>

        {/* Activity Timeline */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#C15A2C]" />
            Recent Activity
          </h2>

          {data.interactions.length > 0 ? (
            <div className="space-y-6 pl-4 border-l-2 border-white/5">
              {data.interactions.map((interaction, i) => (
                <div key={interaction.id} className="relative pl-6">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#001429] border-2 border-[#C15A2C]" />

                  <p className="text-sm text-white/40 mb-1">
                    {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(interaction.created_at))}
                  </p>
                  <p className="text-white font-medium text-sm">
                    <span className="text-[#C15A2C] mr-2 text-xs uppercase tracking-wider">{interaction.type}</span>
                    {interaction.summary}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 rounded-2xl border border-dashed border-white/10">
              <p className="text-white/50">No recent activity detected.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
