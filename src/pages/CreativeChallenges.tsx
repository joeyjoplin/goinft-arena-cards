import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Clock, Trophy, Search, Filter, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChallengeCard } from "@/components/challenge/challenge-card";
import { SubmissionCard } from "@/components/challenge/submission-card";
import { TeamBadge } from "@/components/challenge/team-badge";
import { ChallengeCountdown } from "@/components/challenge/challenge-countdown";

// Types
type SortOption = "active" | "newest" | "popular";
type FilterOption = "all" | "open" | "closed";
type TeamFilter = "all" | string;

interface Challenge {
  id: string;
  title: string;
  description: string;
  theme: string;
  teamId: string;
  teamName: string;
  teamLogo: string;
  isVerified: boolean;
  startDate: Date;
  endDate: Date;
  prizeTiers: {
    tier: string;
    reward: string;
  }[];
  submissionCount: number;
  status: "open" | "closed";
}

interface Submission {
  id: string;
  albumId: string;
  albumTitle: string;
  albumCover: string;
  creator: string;
  creatorAddress: string;
  teamId: string;
  challengeId: string;
  createdAt: Date;
  votes: number;
  userHasVoted: boolean;
}

export default function CreativeChallenges() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SortOption>("active");
  const [filterStatus, setFilterStatus] = useState<FilterOption>("all");
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [teams, setTeams] = useState<{id: string, name: string, logo: string, isVerified: boolean}[]>([]);

  // Effect to load mock data
  useEffect(() => {
    // Mock teams
    const mockTeams = [
      { id: "team1", name: "FC Barcelona", logo: "https://images.unsplash.com/photo-1589279715734-6631a314dfa2?q=80&w=1374&auto=format&fit=crop", isVerified: true },
      { id: "team2", name: "Manchester United", logo: "https://images.unsplash.com/photo-1562099322-45ba2bbfa08d?q=80&w=1470&auto=format&fit=crop", isVerified: true },
      { id: "team3", name: "Bayern Munich", logo: "https://images.unsplash.com/photo-1593478494840-df89745fd686?q=80&w=1374&auto=format&fit=crop", isVerified: true },
      { id: "team4", name: "Local Heroes FC", logo: "https://images.unsplash.com/photo-1610201417828-29f95769261b?q=80&w=1376&auto=format&fit=crop", isVerified: false },
    ];

    // Mock challenges
    const mockChallenges: Challenge[] = [
      {
        id: "challenge1",
        title: "Best Moments of 2023",
        description: "Create an album showcasing the most memorable moments from our 2023 season.",
        theme: "Historic Moments",
        teamId: "team1",
        teamName: "FC Barcelona",
        teamLogo: "https://images.unsplash.com/photo-1589279715734-6631a314dfa2?q=80&w=1374&auto=format&fit=crop",
        isVerified: true,
        startDate: new Date(2023, 11, 1),
        endDate: new Date(2023, 11, 31),
        prizeTiers: [
          { tier: "Gold", reward: "Signed team jersey" },
          { tier: "Silver", reward: "2 VIP tickets" },
          { tier: "Bronze", reward: "Limited edition NFT" }
        ],
        submissionCount: 56,
        status: "closed"
      },
      {
        id: "challenge2",
        title: "Women's Football Icons",
        description: "Celebrate the legendary players from our women's team with a themed album.",
        theme: "Women's Football",
        teamId: "team2",
        teamName: "Manchester United",
        teamLogo: "https://images.unsplash.com/photo-1562099322-45ba2bbfa08d?q=80&w=1470&auto=format&fit=crop",
        isVerified: true,
        startDate: new Date(2023, 12, 15),
        endDate: new Date(2024, 1, 15),
        prizeTiers: [
          { tier: "Gold", reward: "Meet & greet with team" },
          { tier: "Silver", reward: "Signed football" },
          { tier: "Bronze", reward: "Team merchandise package" }
        ],
        submissionCount: 38,
        status: "closed"
      },
      {
        id: "challenge3",
        title: "Youth Academy Stars",
        description: "Design stickers featuring our promising youth academy talents.",
        theme: "Youth Development",
        teamId: "team3",
        teamName: "Bayern Munich",
        teamLogo: "https://images.unsplash.com/photo-1593478494840-df89745fd686?q=80&w=1374&auto=format&fit=crop",
        isVerified: true,
        startDate: new Date(2024, 4, 1),
        endDate: new Date(2024, 5, 30),
        prizeTiers: [
          { tier: "Gold", reward: "Academy training session experience" },
          { tier: "Silver", reward: "Limited edition youth team jersey" },
          { tier: "Bronze", reward: "Digital collectibles pack" }
        ],
        submissionCount: 24,
        status: "open"
      },
      {
        id: "challenge4",
        title: "Local Derby Memories",
        description: "Capture the intensity and history of our local derby matches.",
        theme: "Rivalries",
        teamId: "team1",
        teamName: "FC Barcelona",
        teamLogo: "https://images.unsplash.com/photo-1589279715734-6631a314dfa2?q=80&w=1374&auto=format&fit=crop",
        isVerified: true,
        startDate: new Date(2024, 5, 1),
        endDate: new Date(2024, 6, 15),
        prizeTiers: [
          { tier: "Gold", reward: "Derby day experience package" },
          { tier: "Silver", reward: "Framed historic derby photo" },
          { tier: "Bronze", reward: "Derby day scarf" }
        ],
        submissionCount: 12,
        status: "open"
      },
      {
        id: "challenge5",
        title: "Community Heroes",
        description: "Showcase the fans and community members who make our club special.",
        theme: "Fan Appreciation",
        teamId: "team4",
        teamName: "Local Heroes FC",
        teamLogo: "https://images.unsplash.com/photo-1610201417828-29f95769261b?q=80&w=1376&auto=format&fit=crop",
        isVerified: false,
        startDate: new Date(2024, 3, 15),
        endDate: new Date(2024, 5, 15),
        prizeTiers: [
          { tier: "Gold", reward: "Community spotlight feature" },
          { tier: "Silver", reward: "Season tickets" },
          { tier: "Bronze", reward: "Club merchandise" }
        ],
        submissionCount: 17,
        status: "open"
      }
    ];

    // Mock submissions
    const mockSubmissions: Submission[] = [
      {
        id: "sub1",
        albumId: "album1",
        albumTitle: "Glory Days of 2023",
        albumCover: "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=1470&auto=format&fit=crop",
        creator: "FootballFan92",
        creatorAddress: "0x1234...5678",
        teamId: "team1",
        challengeId: "challenge1",
        createdAt: new Date(2023, 11, 15),
        votes: 234,
        userHasVoted: false
      },
      {
        id: "sub2",
        albumId: "album2",
        albumTitle: "Women Champions",
        albumCover: "https://images.unsplash.com/photo-1571925401922-ea31e412bbfa?q=80&w=1443&auto=format&fit=crop",
        creator: "SoccerLover55",
        creatorAddress: "0xabcd...efgh",
        teamId: "team2",
        challengeId: "challenge2",
        createdAt: new Date(2023, 12, 28),
        votes: 186,
        userHasVoted: true
      },
      {
        id: "sub3",
        albumId: "album3",
        albumTitle: "Future Stars",
        albumCover: "https://images.unsplash.com/photo-1517747614396-d21a5925eee6?q=80&w=1374&auto=format&fit=crop",
        creator: "AcademyFan",
        creatorAddress: "0x7890...1234",
        teamId: "team3",
        challengeId: "challenge3",
        createdAt: new Date(2024, 4, 15),
        votes: 94,
        userHasVoted: false
      },
      {
        id: "sub4",
        albumId: "album4",
        albumTitle: "El Clásico Moments",
        albumCover: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1687&auto=format&fit=crop",
        creator: "DerbyDay",
        creatorAddress: "0xdefg...5678",
        teamId: "team1",
        challengeId: "challenge4",
        createdAt: new Date(2024, 5, 10),
        votes: 76,
        userHasVoted: false
      }
    ];

    setTeams(mockTeams);
    setChallenges(mockChallenges);
    setSubmissions(mockSubmissions);
  }, []);

  // Sort and filter challenges based on active tab
  const filteredChallenges = challenges
    .filter(challenge => {
      // Apply status filter
      if (filterStatus !== "all") {
        if (challenge.status !== filterStatus) return false;
      }
      
      // Apply team filter
      if (teamFilter !== "all") {
        if (challenge.teamId !== teamFilter) return false;
      }
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          challenge.title.toLowerCase().includes(query) ||
          challenge.teamName.toLowerCase().includes(query) ||
          challenge.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (activeTab) {
        case "active":
          // For active, prioritize open challenges and then by end date (closest first)
          if (a.status === "open" && b.status !== "open") return -1;
          if (a.status !== "open" && b.status === "open") return 1;
          return a.endDate.getTime() - b.endDate.getTime();
        case "newest":
          // Newest based on start date
          return b.startDate.getTime() - a.startDate.getTime();
        case "popular":
          // Popular based on submission count
          return b.submissionCount - a.submissionCount;
        default:
          return 0;
      }
    });

  // Get submissions for the selected challenge
  const challengeSubmissions = submissions.filter(
    submission => !selectedChallenge || submission.challengeId === selectedChallenge
  );

  // Handle voting for a submission
  const handleVote = (submissionId: string) => {
    setSubmissions(prev => 
      prev.map(sub => {
        if (sub.id === submissionId) {
          const userHasVoted = !sub.userHasVoted;
          return {
            ...sub,
            votes: userHasVoted ? sub.votes + 1 : sub.votes - 1,
            userHasVoted
          };
        }
        return sub;
      })
    );

    toast({
      title: "Vote registered",
      description: "Your vote has been recorded.",
    });
  };

  // Handle creating a new challenge (would navigate to challenge creation form)
  const handleCreateChallenge = () => {
    toast({
      title: "Feature coming soon",
      description: "Challenge creation will be available soon!",
    });
  };

  // Handle joining a challenge
  const handleJoinChallenge = (challengeId: string) => {
    navigate(`/album-lab?challenge=${challengeId}`);
    toast({
      title: "Joining challenge",
      description: "You'll now create an album for this challenge!",
    });
  };

  // Handle clearing filters
  const handleClearFilters = () => {
    setFilterStatus("all");
    setTeamFilter("all");
    setSearchQuery("");
  };

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Page header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-2 bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text">
          Team Creative Challenges
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Participate in exclusive challenges created by football teams and win rewards by creating themed sticker albums.
        </p>
      </div>

      {/* Actions bar */}
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search challenges or teams..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-goinft-card border-goinft-light/30 focus-visible:ring-neon-purple"
          />
        </div>

        <Button
          onClick={handleCreateChallenge}
          className="w-full md:w-auto bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
        >
          <Trophy className="mr-2 h-4 w-4" />
          Create Challenge
        </Button>
      </div>

      {/* Filters section */}
      <div className="mb-6 bg-goinft-card rounded-lg p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300">Status:</span>
            
            <Badge 
              variant="outline"
              className={`cursor-pointer ${filterStatus === "all" ? "bg-neon-purple/20 border-neon-purple" : "bg-transparent"}`}
              onClick={() => setFilterStatus("all")}
            >
              All
            </Badge>
            
            <Badge 
              variant="outline"
              className={`cursor-pointer ${filterStatus === "open" ? "bg-neon-purple/20 border-neon-purple" : "bg-transparent"}`}
              onClick={() => setFilterStatus("open")}
            >
              Open
            </Badge>
            
            <Badge 
              variant="outline"
              className={`cursor-pointer ${filterStatus === "closed" ? "bg-neon-purple/20 border-neon-purple" : "bg-transparent"}`}
              onClick={() => setFilterStatus("closed")}
            >
              Closed
            </Badge>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm text-gray-300">Teams:</span>
            
            <Badge 
              variant="outline"
              className={`cursor-pointer ${teamFilter === "all" ? "bg-neon-purple/20 border-neon-purple" : "bg-transparent"}`}
              onClick={() => setTeamFilter("all")}
            >
              All Teams
            </Badge>
            
            {teams.map(team => (
              <Badge 
                key={team.id}
                variant="outline"
                className={`cursor-pointer flex items-center gap-1 ${
                  teamFilter === team.id ? "bg-neon-purple/20 border-neon-purple" : "bg-transparent"
                }`}
                onClick={() => setTeamFilter(team.id)}
              >
                <span className="w-3 h-3 rounded-full overflow-hidden">
                  <img src={team.logo} alt={team.name} className="w-full h-full object-cover" />
                </span>
                {team.name}
                {team.isVerified && (
                  <Check className="h-3 w-3 text-neon-blue" />
                )}
              </Badge>
            ))}
          </div>
          
          {(filterStatus !== "all" || teamFilter !== "all" || searchQuery) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearFilters}
              className="text-xs"
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Sorting tabs */}
      <Tabs 
        defaultValue="active" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as SortOption)}
        className="mb-6"
      >
        <TabsList className="bg-goinft-card">
          <TabsTrigger value="active" className="data-[state=active]:bg-goinft-light">
            <Clock className="h-4 w-4 mr-2" /> Active
          </TabsTrigger>
          <TabsTrigger value="newest" className="data-[state=active]:bg-goinft-light">
            <Clock className="h-4 w-4 mr-2" /> Newest
          </TabsTrigger>
          <TabsTrigger value="popular" className="data-[state=active]:bg-goinft-light">
            <TrendingUp className="h-4 w-4 mr-2" /> Popular
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Challenges list */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard 
              key={challenge.id}
              challenge={challenge}
              isSelected={selectedChallenge === challenge.id}
              onSelect={() => setSelectedChallenge(challenge.id === selectedChallenge ? null : challenge.id)}
              onJoin={() => handleJoinChallenge(challenge.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="bg-goinft-card border-none mb-8">
          <CardContent className="p-10 flex flex-col items-center justify-center">
            <p className="text-xl text-gray-400 mb-4">No challenges match your search criteria.</p>
            <Button 
              variant="outline"
              onClick={handleClearFilters}
            >
              Reset Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Submissions section */}
      {selectedChallenge && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-orbitron">
              Challenge Submissions
            </h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedChallenge(null)}
            >
              View All Challenges
            </Button>
          </div>

          {challengeSubmissions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challengeSubmissions.map(submission => (
                <SubmissionCard
                  key={submission.id}
                  submission={submission}
                  onVote={() => handleVote(submission.id)}
                />
              ))}
            </div>
          ) : (
            <Card className="bg-goinft-card border-none">
              <CardContent className="p-10 flex flex-col items-center justify-center">
                <p className="text-xl text-gray-400 mb-4">No submissions for this challenge yet.</p>
                <Button 
                  onClick={() => handleJoinChallenge(selectedChallenge)}
                >
                  Be the first to participate
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
