import { useState, useRef, useEffect } from 'react';
import { Star, Heart, MapPin, Calendar, Crown, Sparkles, Trophy, Medal, Zap, ArrowUp, Share2, Bookmark, Camera, Award, Filter, CalendarDays, Sun, Snowflake, Leaf, CloudRain, Edit, Trash2, Flag, MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useParams, useNavigate } from 'react-router-dom';
import { useUploadedImages } from '@/hooks/useUploadedImages';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RetroImage from '@/components/RetroImage';
import MomentDetailsModal from '@/components/MomentDetailsModal';
import CreateMomentModal from '@/components/CreateMomentModal';
import EditMomentModal from '@/components/EditMomentModal';
import ReportMomentModal from '@/components/ReportMomentModal';
import heroCollage from '@/assets/hero-collage.webp';
import graduationCeremony from '@/assets/graduation-ceremony.jpg';
import championshipVictory from '@/assets/championship-victory.jpg';
import culturalPerformance from '@/assets/cultural-performance.jpg';
import firstDayFriends from '@/assets/first-day-friends.jpg';
import techInnovation from '@/assets/tech-innovation.jpg';
import farewellMoment from '@/assets/farewell-moment.jpg';
import winterFestival from '@/assets/winter-festival.jpg';
import academicExcellence from '@/assets/academic-excellence.jpg';
import poetryNight from '@/assets/poetry-night.jpg';
import researchBreakthrough from '@/assets/research-breakthrough.jpg';
import fitnessAchievement from '@/assets/fitness-achievement.jpg';
import springFestival from '@/assets/spring-festival.jpg';
import internshipSuccess from '@/assets/internship-success.jpg';
import studySession from '@/assets/study-session.jpg';
import communityService from '@/assets/community-service.jpg';

// Golden moments data with seasons, years, and more detailed posts
const goldenMoments = [{
  id: 1,
  title: 'Graduation Day Glory',
  subtitle: 'Four years of hard work finally paid off',
  image: graduationCeremony,
  date: 'June 20, 2023',
  year: 2023,
  month: 'June',
  season: 'summer',
  likes: 1247,
  location: 'Grand Auditorium',
  category: 'legendary',
  badge: {
    text: 'Most Liked',
    icon: Heart,
    color: 'bg-gradient-sunset'
  },
  tags: ['graduation', 'achievement', 'milestone'],
  description: 'The culmination of four years of dedication, late nights, and perseverance. Walking across that stage felt like conquering the world.'
}, {
  id: 2,
  title: 'Championship Victory',
  subtitle: 'Brought home the trophy after 5 years',
  image: championshipVictory,
  date: 'March 15, 2023',
  year: 2023,
  month: 'March',
  season: 'spring',
  likes: 892,
  location: 'Sports Complex',
  category: 'achievements',
  badge: {
    text: 'Champion',
    icon: Trophy,
    color: 'bg-gradient-vintage'
  },
  tags: ['sports', 'victory', 'team'],
  description: 'Years of training and teamwork finally paid off. The moment we lifted that trophy was pure magic.'
}, {
  id: 3,
  title: 'Cultural Fest Standing Ovation',
  subtitle: 'A performance that resonated with everyone',
  image: culturalPerformance,
  date: 'November 12, 2022',
  year: 2022,
  month: 'November',
  season: 'autumn',
  likes: 654,
  location: 'Main Auditorium',
  category: 'legendary',
  badge: {
    text: 'Legendary',
    icon: Crown,
    color: 'bg-gradient-retro'
  },
  tags: ['cultural', 'performance', 'legendary'],
  description: 'A performance that brought the entire auditorium to their feet. The energy was electric and unforgettable.'
}, {
  id: 4,
  title: 'First Day Friendships',
  subtitle: 'The beginning of lifelong bonds',
  image: firstDayFriends,
  date: 'August 15, 2022',
  year: 2022,
  month: 'August',
  season: 'summer',
  likes: 445,
  location: 'College Entrance',
  category: 'milestones',
  badge: {
    text: 'Milestone',
    icon: Medal,
    color: 'bg-gradient-sunset'
  },
  tags: ['friendship', 'first day', 'memories'],
  description: 'The nervous excitement of the first day turned into the foundation of friendships that would last a lifetime.'
}, {
  id: 5,
  title: 'Tech Fest Innovation Award',
  subtitle: 'When dedication meets innovation',
  image: techInnovation,
  date: 'February 28, 2023',
  year: 2023,
  month: 'February',
  season: 'winter',
  likes: 723,
  location: 'Innovation Lab',
  category: 'achievements',
  badge: {
    text: 'Innovation',
    icon: Zap,
    color: 'bg-gradient-vintage'
  },
  tags: ['technology', 'innovation', 'award'],
  description: 'Months of coding, debugging, and refining resulted in recognition for breakthrough innovation.'
}, {
  id: 6,
  title: 'Farewell Tears & Cheers',
  subtitle: 'A goodbye that felt like see you later',
  image: farewellMoment,
  date: 'May 30, 2023',
  year: 2023,
  month: 'May',
  season: 'spring',
  likes: 1089,
  location: 'College Grounds',
  category: 'legendary',
  badge: {
    text: 'Emotional',
    icon: Heart,
    color: 'bg-gradient-sunset'
  },
  tags: ['farewell', 'emotions', 'memories'],
  description: 'The bittersweet moment of saying goodbye to a place that shaped us all. Tears mixed with laughter as we promised to stay in touch.'
}, {
  id: 7,
  title: 'Winter Wonderland Celebration',
  subtitle: 'Snow-filled festivities and warm hearts',
  image: winterFestival,
  date: 'December 15, 2022',
  year: 2022,
  month: 'December',
  season: 'winter',
  likes: 856,
  location: 'Campus Quad',
  category: 'milestones',
  badge: {
    text: 'Festive',
    icon: Snowflake,
    color: 'bg-gradient-retro'
  },
  tags: ['winter', 'celebration', 'festival'],
  description: 'When snow covered the campus, we turned it into a magical winter wonderland with festivals and celebrations.'
}, {
  id: 8,
  title: 'Academic Excellence Award',
  subtitle: 'Recognition for outstanding scholarly achievement',
  image: academicExcellence,
  date: 'April 10, 2023',
  year: 2023,
  month: 'April',
  season: 'spring',
  likes: 912,
  location: 'Dean\'s Office',
  category: 'achievements',
  badge: {
    text: 'Excellence',
    icon: Award,
    color: 'bg-gradient-vintage'
  },
  tags: ['academic', 'excellence', 'achievement'],
  description: 'Years of dedication to studies culminated in this prestigious academic recognition.'
}, {
  id: 9,
  title: 'Autumn Poetry Night',
  subtitle: 'Words that painted the season beautifully',
  image: poetryNight,
  date: 'October 22, 2022',
  year: 2022,
  month: 'October',
  season: 'autumn',
  likes: 567,
  location: 'Literature Hall',
  category: 'legendary',
  badge: {
    text: 'Artistic',
    icon: Leaf,
    color: 'bg-gradient-sunset'
  },
  tags: ['poetry', 'autumn', 'literature'],
  description: 'An evening where words flowed like autumn leaves, creating magic in the hearts of everyone present.'
}, {
  id: 10,
  title: 'Summer Research Breakthrough',
  subtitle: 'Discovery that changed everything',
  image: researchBreakthrough,
  date: 'July 8, 2023',
  year: 2023,
  month: 'July',
  season: 'summer',
  likes: 1034,
  location: 'Research Lab',
  category: 'achievements',
  badge: {
    text: 'Discovery',
    icon: Star,
    color: 'bg-gradient-vintage'
  },
  tags: ['research', 'discovery', 'summer'],
  description: 'A summer spent in the lab led to a breakthrough that would influence research for years to come.'
}, {
  id: 11,
  title: 'New Year Resolution Success',
  subtitle: 'Achieving what seemed impossible',
  image: fitnessAchievement,
  date: 'January 1, 2023',
  year: 2023,
  month: 'January',
  season: 'winter',
  likes: 698,
  location: 'Fitness Center',
  category: 'milestones',
  badge: {
    text: 'Determination',
    icon: Zap,
    color: 'bg-gradient-retro'
  },
  tags: ['resolution', 'fitness', 'achievement'],
  description: 'Starting the year with determination and actually following through on those ambitious resolutions.'
}, {
  id: 12,
  title: 'Spring Festival Organizing',
  subtitle: 'Leading the biggest campus event',
  image: springFestival,
  date: 'March 20, 2023',
  year: 2023,
  month: 'March',
  season: 'spring',
  likes: 823,
  location: 'Event Grounds',
  category: 'legendary',
  badge: {
    text: 'Leadership',
    icon: Crown,
    color: 'bg-gradient-sunset'
  },
  tags: ['leadership', 'festival', 'organizing'],
  description: 'Taking charge of the spring festival and turning it into the most memorable event in campus history.'
}, {
  id: 13,
  title: 'Internship Achievement',
  subtitle: 'Real-world experience that shaped my future',
  image: internshipSuccess,
  date: 'June 30, 2022',
  year: 2022,
  month: 'June',
  season: 'summer',
  likes: 756,
  location: 'Corporate Office',
  category: 'achievements',
  badge: {
    text: 'Professional',
    icon: Trophy,
    color: 'bg-gradient-vintage'
  },
  tags: ['internship', 'professional', 'experience'],
  description: 'A transformative internship experience that opened doors to future career opportunities.'
}, {
  id: 14,
  title: 'Midnight Study Sessions',
  subtitle: 'Late nights that built character',
  image: studySession,
  date: 'September 15, 2022',
  year: 2022,
  month: 'September',
  season: 'autumn',
  likes: 634,
  location: 'Library',
  category: 'milestones',
  badge: {
    text: 'Dedication',
    icon: Medal,
    color: 'bg-gradient-retro'
  },
  tags: ['study', 'dedication', 'perseverance'],
  description: 'Those countless midnight hours in the library that taught the true meaning of dedication and perseverance.'
}, {
  id: 15,
  title: 'Community Service Impact',
  subtitle: 'Making a difference in the local community',
  image: communityService,
  date: 'August 25, 2023',
  year: 2023,
  month: 'August',
  season: 'summer',
  likes: 945,
  location: 'Community Center',
  category: 'legendary',
  badge: {
    text: 'Impact',
    icon: Heart,
    color: 'bg-gradient-sunset'
  },
  tags: ['community', 'service', 'impact'],
  description: 'Organizing community service projects that created lasting positive change in the neighborhood.'
}];

const GoldenMoments = () => {
  const { momentId } = useParams();
  const navigate = useNavigate();
  const { uploadedImages, updateImage, deleteImage } = useUploadedImages();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [likedMoments, setLikedMoments] = useState<Set<string | number>>(new Set([1, 3, 6]));
  const [bookmarkedMoments, setBookmarkedMoments] = useState<Set<string | number>>(new Set([2, 4]));
  const [selectedMoment, setSelectedMoment] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingMoment, setEditingMoment] = useState<any>(null);
  const [reportingMoment, setReportingMoment] = useState<any>(null);
  const [deletingMoment, setDeletingMoment] = useState<any>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Convert uploaded images to moment format and combine with static moments
  const convertUploadedToMoments = (images: any[]) => {
    return images.map((img, index) => ({
      id: `uploaded_${img.id}`,
      title: img.title,
      subtitle: img.description || 'A precious moment',
      image: img.src,
      date: img.date ? new Date(img.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      year: img.date ? new Date(img.date).getFullYear() : new Date().getFullYear(),
      month: img.date ? new Date(img.date).toLocaleDateString('en-US', { month: 'long' }) : new Date().toLocaleDateString('en-US', { month: 'long' }),
      season: getCurrentSeason(img.date ? new Date(img.date) : new Date()),
      likes: img.likes,
      location: img.location || 'Unknown',
      category: 'milestones', // Default category for uploaded images
      badge: {
        text: 'Your Memory',
        icon: Camera,
        color: 'bg-gradient-sunset'
      },
      tags: img.tags || [],
      description: img.description || 'A moment worth remembering',
      isUploaded: true,
      uploadedImageId: img.id
    }));
  };

  const getCurrentSeason = (date: Date) => {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  const allMoments = [
    ...convertUploadedToMoments(uploadedImages),
    ...goldenMoments
  ];

  const [moments, setMoments] = useState(allMoments);

  // Update moments when uploaded images change
  useEffect(() => {
    const updatedMoments = [
      ...convertUploadedToMoments(uploadedImages),
      ...goldenMoments
    ];
    setMoments(updatedMoments);
  }, [uploadedImages]);

  // Check for shared moment URL and open modal
  useEffect(() => {
    if (momentId) {
      const sharedMoment = allMoments.find(moment => 
        moment.id === parseInt(momentId) || moment.id === momentId
      );
      if (sharedMoment) {
        setSelectedMoment(sharedMoment);
        setShowDetailsModal(true);
      } else {
        // If moment not found, redirect to main page
        navigate('/golden-moments', { replace: true });
      }
    }
  }, [momentId, navigate, allMoments]);

  // Parallax and scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || 0;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${y * 0.05}px) scale(1.1)`;
      }
      setShowScrollTop(y > 500);
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleLike = (momentId: string | number) => {
    const newLiked = new Set(likedMoments);
    if (newLiked.has(momentId)) {
      newLiked.delete(momentId);
      toast({
        title: "Removed from favorites",
        description: "Golden moment removed from favorites"
      });
    } else {
      newLiked.add(momentId);
      toast({
        title: "Added to favorites ❤️",
        description: "Golden moment added to favorites"
      });
    }
    setLikedMoments(newLiked);
  };
  
  const handleBookmark = (momentId: string | number) => {
    const newBookmarked = new Set(bookmarkedMoments);
    if (newBookmarked.has(momentId)) {
      newBookmarked.delete(momentId);
      toast({
        title: "Removed bookmark",
        description: "Golden moment removed from bookmarks"
      });
    } else {
      newBookmarked.add(momentId);
      toast({
        title: "Bookmarked! 🔖",
        description: "Golden moment bookmarked for later"
      });
    }
    setBookmarkedMoments(newBookmarked);
  };
  const handleShare = async (moment: any) => {
    const shareText = `Check out this golden moment: ${moment.title} - ${moment.subtitle}`;
    const shareUrl = `${window.location.origin}/golden-moment/${moment.id}`;
    
    // Check if Web Share API is available and supported
    if (navigator.share && navigator.canShare && navigator.canShare({ url: shareUrl })) {
      try {
        await navigator.share({
          title: moment.title,
          text: shareText,
          url: shareUrl
        });
        return;
      } catch (err) {
        // If share fails, fall through to clipboard
        console.log('Share failed, falling back to clipboard');
      }
    }
    
    // Fallback to clipboard - only copy URL
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied! 📋",
        description: "Golden moment link copied to clipboard"
      });
    } catch (err) {
      // Final fallback - create text area and copy only URL
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      toast({
        title: "Link copied! 📋",
        description: "Golden moment link copied to clipboard"
      });
    }
  };
  const handleViewDetails = (moment: any) => {
    setSelectedMoment(moment);
    setShowDetailsModal(true);
    // Update URL without triggering a page reload
    navigate(`/golden-moment/${moment.id}`, { replace: true });
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedMoment(null);
    // Return to main golden moments page
    navigate('/golden-moments', { replace: true });
  };
  const handleCreateMoment = () => {
    setShowCreateModal(true);
  };

  // New handlers for edit, delete, and report
  const handleEditMoment = (moment: any) => {
    setEditingMoment(moment);
    setShowEditModal(true);
  };

  const handleSaveMoment = (updatedMoment: any) => {
    if (updatedMoment.isUploaded) {
      // Update the uploaded image
      const updates = {
        title: updatedMoment.title,
        description: updatedMoment.description,
        location: updatedMoment.location,
        date: updatedMoment.date ? new Date(updatedMoment.date).toISOString().split('T')[0] : undefined,
        tags: updatedMoment.tags || []
      };
      updateImage(updatedMoment.uploadedImageId, updates);
    } else {
      // Update static moment
      setMoments(prev => prev.map(m => 
        m.id === updatedMoment.id ? updatedMoment : m
      ));
    }
    setShowEditModal(false);
    setEditingMoment(null);
  };

  const handleDeleteMoment = (moment: any) => {
    setDeletingMoment(moment);
    setShowDeleteDialog(true);
  };

  const confirmDeleteMoment = () => {
    if (deletingMoment) {
      if (deletingMoment.isUploaded) {
        // Delete the uploaded image
        deleteImage(deletingMoment.uploadedImageId);
      } else {
        // Remove static moment from display
        setMoments(prev => prev.filter(m => m.id !== deletingMoment.id));
      }
      toast({
        title: "Moment deleted",
        description: "The golden moment has been removed successfully."
      });
      setShowDeleteDialog(false);
      setDeletingMoment(null);
    }
  };

  const handleReportMoment = (moment: any) => {
    setReportingMoment(moment);
    setShowReportModal(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  // Calculate actual counts from data
  const calculateCount = (category: string) => {
    if (category === 'all') return moments.length;
    return moments.filter(moment => moment.category === category).length;
  };

  const categories = [{
    id: 'all',
    name: 'All Moments',
    icon: Sparkles,
    count: calculateCount('all'),
    gradient: 'bg-gradient-hero'
  }, {
    id: 'legendary',
    name: 'Legendary',
    icon: Crown,
    count: calculateCount('legendary'),
    gradient: 'bg-gradient-sunset'
  }, {
    id: 'achievements',
    name: 'Achievements',
    icon: Trophy,
    count: calculateCount('achievements'),
    gradient: 'bg-gradient-vintage'
  }, {
    id: 'milestones',
    name: 'Milestones',
    icon: Medal,
    count: calculateCount('milestones'),
    gradient: 'bg-gradient-retro'
  }];

  // Get unique values for filters
  const uniqueYears = [...new Set(moments.map(moment => moment.year))].sort((a, b) => b - a);
  const uniqueMonths = [...new Set(moments.map(moment => moment.month))];
  const uniqueSeasons = [...new Set(moments.map(moment => moment.season))];

  // Advanced filtering
  const filteredMoments = moments.filter(moment => {
    const categoryMatch = selectedCategory === 'all' || moment.category === selectedCategory;
    const yearMatch = selectedYear === 'all' || moment.year.toString() === selectedYear;
    const monthMatch = selectedMonth === 'all' || moment.month === selectedMonth;
    const seasonMatch = selectedSeason === 'all' || moment.season === selectedSeason;
    
    return categoryMatch && yearMatch && monthMatch && seasonMatch;
  });

  // Season icons mapping
  const seasonIcons = {
    spring: CloudRain,
    summer: Sun,
    autumn: Leaf,
    winter: Snowflake
  };
  return <div className="min-h-screen relative overflow-hidden">
      {/* Funky Animated Background */}
      <div ref={heroRef} className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out" style={{
      backgroundImage: `url(${heroCollage})`,
      transform: 'translateZ(0) scale(1.1)'
    }}>
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-retro-purple/20 via-transparent to-sunset-orange/20" />
      </div>


      {/* Content */}
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20 animate-fade-in">
            <div className="space-y-6">
              <div className="retro-handwritten text-sunset-orange text-2xl mb-4">
                Celebrating Life's Best Moments
              </div>
              
              <h1 className="retro-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight transition-all duration-300 cursor-default">
                Golden
                <br />
                <span className="bg-gradient-sunset bg-clip-text text-transparent">
                  Moments
                </span>
              </h1>
              
              <p className="text-warm-cream text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500 font-medium" style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}>
                A curated collection of meaningful memories that define our college journey - from personal achievements to milestone moments worth remembering.
              </p>

              {/* Fun Stats */}
              <div className="flex justify-center space-x-8 mt-8 animate-fade-in delay-700">
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">{moments.length}</div>
                  <div className="text-warm-cream text-sm font-medium">Golden Moments</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">{moments.reduce((total, moment) => total + moment.likes, 0).toLocaleString()}</div>
                  <div className="text-warm-cream text-sm font-medium">Total Likes</div>
                </div>
                <div className="text-center transform hover:scale-105 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-1 retro-heading">{uniqueYears.length}</div>
                  <div className="text-warm-cream text-sm font-medium">Years of Memories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="mb-8 animate-fade-in delay-200">
            <div className="max-w-6xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6">
              <div className="flex items-center justify-center mb-4">
                <Filter className="h-5 w-5 text-white mr-2" />
                <h3 className="text-white font-bold text-lg">Advanced Filters</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Year Filter */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Year
                  </label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Years</SelectItem>
                      {uniqueYears.map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Month Filter */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Month
                  </label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Months</SelectItem>
                      {uniqueMonths.map(month => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Season Filter */}
                <div className="space-y-2">
                  <label className="text-white text-sm font-medium flex items-center">
                    <Sun className="h-4 w-4 mr-2" />
                    Season
                  </label>
                  <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Seasons</SelectItem>
                      {uniqueSeasons.map(season => {
                        const SeasonIcon = seasonIcons[season as keyof typeof seasonIcons];
                        return (
                          <SelectItem key={season} value={season}>
                            <div className="flex items-center">
                              <SeasonIcon className="h-4 w-4 mr-2" />
                              {season.charAt(0).toUpperCase() + season.slice(1)}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active Filters Display */}
              {(selectedYear !== 'all' || selectedMonth !== 'all' || selectedSeason !== 'all') && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-white text-sm font-medium">Active filters:</span>
                    {selectedYear !== 'all' && (
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                        Year: {selectedYear}
                      </span>
                    )}
                    {selectedMonth !== 'all' && (
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                        Month: {selectedMonth}
                      </span>
                    )}
                    {selectedSeason !== 'all' && (
                      <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                        Season: {selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)}
                      </span>
                    )}
                    <button
                      onClick={() => {
                        setSelectedYear('all');
                        setSelectedMonth('all');
                        setSelectedSeason('all');
                      }}
                      className="bg-sunset-orange text-white px-3 py-1 rounded-full text-sm hover:bg-sunset-orange/80 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
              
              {/* Results Count */}
              <div className="mt-4 text-center">
                <span className="text-white/80 text-sm">
                  Showing {filteredMoments.length} of {moments.length} moments
                </span>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="mb-12 animate-fade-in delay-300 relative z-40">
            <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto relative z-40">
              {categories.map((category, index) => {
              const IconComponent = category.icon;
              return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`
                      ${category.gradient} 
                      ${selectedCategory === category.id ? 'scale-105 shadow-retro ring-2 ring-white/30' : 'hover:scale-105 hover:shadow-vintage hover:-translate-y-1'}
                      text-white px-8 py-6 rounded-full font-bold text-base
                      transition-all duration-300 transform
                      focus:outline-none backdrop-blur-sm border-2 border-white/40 
                      flex items-center space-x-3 min-w-[160px] justify-center
                      relative overflow-hidden group z-50
                    `} style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    
                    <IconComponent className="h-6 w-6" />
                    <span className="relative z-10">{category.name}</span>
                    <span className="bg-white/30 text-sm px-3 py-1 rounded-full font-bold">{category.count}</span>
                  </button>;
            })}
            </div>
          </div>

          {/* Golden Moments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 animate-fade-in delay-500 relative z-30">
            {filteredMoments.map((moment, index) => {
            const BadgeIcon = moment.badge.icon;
            return <div key={moment.id} className="group animate-scale-in relative z-10" style={{
              animationDelay: `${index * 0.2}s`
            }}>
                  <div className="retro-card hover:shadow-retro transition-all duration-500 hover:-translate-y-2 relative overflow-hidden transform-gpu">
                     {/* Badge */}
                     <div className="absolute top-4 right-4 z-50">
                      <div className={`${moment.badge.color} text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-vintage transform hover:scale-105 transition-all duration-300`}>
                        <BadgeIcon className="h-4 w-4" />
                        <span>{moment.badge.text}</span>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative mb-6 group-hover:scale-102 transition-all duration-500">
                      <RetroImage src={moment.image} alt={moment.title} variant="polaroid" size="full" aspectRatio="landscape" rotation="slight" className="w-full" />
                      
                        {/* Action Buttons */}
                        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2 z-50">
                          <button onClick={() => handleLike(moment.id)} className={`p-3 rounded-full shadow-vintage transition-all duration-300 hover:scale-105 relative z-50 ${likedMoments.has(moment.id) ? 'bg-sunset-orange text-white' : 'bg-white/90 backdrop-blur-sm hover:bg-white text-sunset-orange'}`}>
                            <Heart className={`h-5 w-5 ${likedMoments.has(moment.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button onClick={() => handleBookmark(moment.id)} className={`p-3 rounded-full shadow-vintage transition-all duration-300 hover:scale-105 relative z-50 ${bookmarkedMoments.has(moment.id) ? 'bg-vintage-teal text-white' : 'bg-white/90 backdrop-blur-sm hover:bg-white text-vintage-teal'}`}>
                            <Bookmark className={`h-5 w-5 ${bookmarkedMoments.has(moment.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button onClick={() => handleShare(moment)} className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-vintage hover:bg-white transition-all duration-300 hover:scale-105 text-retro-purple relative z-50">
                           <Share2 className="h-5 w-5" />
                         </button>
                         
                          {/* More Actions Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-vintage hover:bg-white transition-all duration-300 hover:scale-105 text-gray-600 relative z-50">
                                <MoreVertical className="h-5 w-5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 z-[100] bg-white/95 backdrop-blur-sm border border-white/20">
                             <DropdownMenuItem onClick={() => handleEditMoment(moment)}>
                               <Edit className="h-4 w-4 mr-2" />
                               Edit Moment
                             </DropdownMenuItem>
                             <DropdownMenuItem 
                               onClick={() => handleDeleteMoment(moment)}
                               className="text-red-600 focus:text-red-600"
                             >
                               <Trash2 className="h-4 w-4 mr-2" />
                               Delete Moment
                             </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => handleReportMoment(moment)}>
                               <Flag className="h-4 w-4 mr-2" />
                               Report Moment
                             </DropdownMenuItem>
                           </DropdownMenuContent>
                         </DropdownMenu>
                       </div>

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-80 transition-opacity duration-300 rounded-lg flex items-center justify-center z-40">
                         <Button onClick={() => handleViewDetails(moment)} className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 hover:bg-white/30 hover:scale-105 transition-all duration-300 rounded-full px-6 py-3 font-bold relative z-50">
                           <Star className="h-5 w-5 mr-2" />
                           View Details
                         </Button>
                       </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="retro-heading text-foreground text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {moment.title}
                        </h3>
                        <p className="text-muted-foreground text-base italic retro-handwritten font-medium">
                          {moment.subtitle}
                        </p>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center justify-between">
                        <button onClick={() => handleLike(moment.id)} className={`flex items-center space-x-2 transition-all duration-300 hover:scale-105 font-medium ${likedMoments.has(moment.id) ? 'text-sunset-orange' : 'text-muted-foreground hover:text-sunset-orange'}`}>
                          <Heart className={`h-5 w-5 ${likedMoments.has(moment.id) ? 'fill-current' : ''}`} />
                          <span>{moment.likes + (likedMoments.has(moment.id) ? 1 : 0)}</span>
                        </button>
                      </div>

                      {/* Date and Location with icons */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1 hover:text-vintage-teal transition-colors">
                          <Calendar className="h-4 w-4" />
                          <span>{moment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-retro-purple transition-colors">
                          <MapPin className="h-4 w-4" />
                          <span>{moment.location}</span>
                        </div>
                      </div>

                      {/* Funky Tags */}
                      <div className="flex flex-wrap gap-2">
                        {moment.tags.map((tag, tagIndex) => <span key={tagIndex} className="px-3 py-1 bg-gradient-vintage text-white text-xs rounded-full shadow-sm font-bold hover:scale-110 transition-all duration-300 cursor-pointer">
                            #{tag}
                          </span>)}
                      </div>
                    </div>
                  </div>
                </div>;
          })}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-20 animate-fade-in delay-1000">
            <div className="retro-card max-w-3xl mx-auto bg-gradient-hero text-white relative overflow-hidden">
              
              <div className="text-center relative z-10">
                <div className="flex justify-center space-x-4 mb-6">
                  <Award className="h-12 w-12 text-sunset-orange" />
                  <Camera className="h-12 w-12 text-vintage-teal" />
                  <Star className="h-12 w-12 text-retro-purple" />
                </div>
                
                <h3 className="retro-heading text-3xl font-bold mb-4">
                  Create Your Golden Moment
                </h3>
                <p className="text-warm-cream mb-8 leading-relaxed text-lg font-medium">
                  Every memory has the potential to become golden. Share your meaningful moments and inspire others.
                </p>
                <Button onClick={handleCreateMoment} className="px-10 py-5 text-lg font-bold bg-white text-foreground rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-retro focus:outline-none focus:ring-4 focus:ring-white/50">
                  <Camera className="h-6 w-6 mr-3" />
                  Share Your Moment
                </Button>
              </div>
            </div>
          </div>

          {/* Scroll to Top Button */}
          {showScrollTop && <button onClick={scrollToTop} className="fixed bottom-8 right-8 bg-gradient-sunset text-white p-4 rounded-full shadow-retro hover:shadow-vintage transition-all duration-300 hover:scale-105 z-50">
              <ArrowUp className="h-6 w-6" />
            </button>}
        </main>

        <Footer />

        {/* Modals */}
        <MomentDetailsModal moment={selectedMoment} isOpen={showDetailsModal} onClose={handleCloseModal} onLike={handleLike} onBookmark={handleBookmark} onShare={handleShare} likedMoments={likedMoments} bookmarkedMoments={bookmarkedMoments} />

        <CreateMomentModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />
        
        <EditMomentModal 
          isOpen={showEditModal} 
          onClose={() => setShowEditModal(false)} 
          moment={editingMoment} 
          onSave={handleSaveMoment} 
        />
        
        <ReportMomentModal 
          isOpen={showReportModal} 
          onClose={() => setShowReportModal(false)} 
          momentTitle={reportingMoment?.title || ''} 
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Golden Moment</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete "{deletingMoment?.title}"? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteMoment} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>;
};
export default GoldenMoments;