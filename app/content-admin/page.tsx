"use client";
import { useState } from "react";
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    CalendarClock,
    FileText,
    Activity,
    CreditCard,
    Settings,
    LogOut,
    TrendingUp,
    AlertTriangle,
    DollarSign,
    CheckCircle, Search,
    MoreVertical,
    XCircle,
    Ban, Eye,
    MessageCircle, Filter,
    CalendarDays,
    Clock,
    Instagram,
    Facebook,
    Linkedin,
    Pause,
    Calendar,
    Trash2,
    Download,
    FileX,
    User,
    Zap,
    Database,
    LineChart,
    ArrowUpRight, ShieldAlert,
    Plus,

} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function SuperAdminDashboard() {
    const posts = [
        {
            name: "Mike Chen",
            category: "Fitness",
            message:
                "Transform your body, transform your life! 💪 Start your fitness journey today.",
            time: "10:00:00 AM",
            platform: "instagram",
            image: "/images/grid-image/image-03.png",
        },
        {
            name: "James Wilson",
            category: "Real Estate",
            message:
                "GET RICH QUICK! Buy now or regret forever! Limited slots!🏠💰",
            time: "2:00:00 PM",
            platform: "facebook",
            image: "/images/grid-image/image-02.png",
        },
        {
            name: "Dr. Sarah Johnson",
            category: "Dentistry",
            message:
                "Keep your smile bright! Brush twice daily and floss regularly. Your teeth will thank you!😁",
            time: "4:00:00 PM",
            platform: "linkedin",
            image: "/images/grid-image/image-01.png",
        },
        {
            name: "Lisa Thompson",
            category: "Beauty & Spa",
            message:
                "Unwind and relax at our exclusive spa. Wine and beauty treatments 🍷🍸",
            time: "6:00:00 PM",
            platform: "instagram",
            image: "/images/grid-image/image-04.png",
        },
        {
            name: "Emily Rodriguez",
            category: "Restaurant",
            message:
                "Fresh from our kitchen! Try our signature pasta with homemade sauce. 🍝Limited availability!",
            time: "12:00:00 PM",
            platform: "instagram",
            image: "/images/grid-image/image-05.png",
        },
    ];
    const [activeTab, setActiveTab] = useState("User Management");

    const menus = [
        { name: "User Management", icon: Users },
        { name: "Content Moderation", icon: ShieldCheck },
        { name: "Schedule Posts", icon: CalendarClock },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-72 bg-white shadow-md flex flex-col justify-between">
                <div className="p-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-3 rounded-md">
                            <ShieldCheck className="text-white" size={22} />
                        </div>
                        <div>
                            <h1 className="text-black text-lg font-semibold">Shoutly AI</h1>
                            <p className="text-sm text-gray-500">Admin Panel</p>
                        </div>
                    </div>

                    <hr className="my-6" />

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">S</span>
                        </div>
                        <div>
                            <h2 className="text-black font-medium">Sarah Miller</h2>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-violet-600 rounded-md">
                                Content Admin
                            </span>
                        </div>
                    </div>

                    <hr className="my-6" />

                    {/* Menu */}
                    <nav className="space-y-1">
                        {menus.map((menu) => {
                            const Icon = menu.icon;
                            const isActive = activeTab === menu.name;
                            return (
                                <button
                                    key={menu.name}
                                    onClick={() => setActiveTab(menu.name)}
                                    className={`flex items-center gap-2 w-full px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                                        ? "bg-blue-100 text-blue-600"
                                        : "text-black hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon size={18} />
                                    {menu.name}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <div className="p-6">
                    <button className="flex items-center gap-2 text-red-600 font-medium">
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1">
                {/* Header */}
                <header className="flex justify-between items-center bg-white px-8 py-5 shadow-sm">
                    <h1 className="text-xl font-semibold text-black">Dashboard</h1>
                    <div className="text-right">
                        <p className="text-black font-medium">Sarah Miller</p>
                        <p className="text-sm text-gray-500">admin@shoutly.ai</p>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {activeTab === "User Management" && (
                        <div className="space-y-8">

                            {/* Top Search + Tabs */}
                            <div className="flex justify-between items-center">

                                {/* Search */}
                                <div className="relative w-80 bg-white">
                                    <Search size={18} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search users..."
                                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    />
                                </div>

                                {/* Filter Tabs */}
                                <div className="bg-white p-1 rounded-lg flex gap-2">
                                    {["All", "Active", "Suspended", "Blocked"].map((tab) => (
                                        <button
                                            key={tab}
                                            className="px-4 py-1 text-sm rounded-md text-black hover:bg-purple-600 hover:text-white transition"
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* User Cards */}
                            <div className="grid grid-cols-3 gap-6">

                                {/* CARD COMPONENT REUSABLE STYLE */}
                                {[
                                    {
                                        letter: "D",
                                        name: "Dr. Sarah Johnson",
                                        email: "sarah@dentalcare.com",
                                        industry: "Dentistry",
                                        plan: "Yearly",
                                        posts: "124",
                                        violations: "0",
                                        status: "active",
                                        platforms: ["facebook", "instagram", "linkedin"]
                                    },
                                    {
                                        letter: "M",
                                        name: "Mike Chen",
                                        email: "mike@fitnessplus.com",
                                        industry: "Fitness",
                                        plan: "Monthly",
                                        posts: "87",
                                        violations: "1",
                                        status: "active",
                                        platforms: ["instagram", "x"]
                                    },
                                    {
                                        letter: "E",
                                        name: "Emily Rodriguez",
                                        email: "emily@foodhub.com",
                                        industry: "Restaurant",
                                        plan: "Monthly",
                                        posts: "156",
                                        violations: "0",
                                        status: "active",
                                        platforms: ["facebook", "instagram"]
                                    },
                                    {
                                        letter: "J",
                                        name: "James Wilson",
                                        email: "james@realestate.com",
                                        industry: "Real Estate",
                                        plan: "Monthly",
                                        posts: "203",
                                        violations: "2",
                                        status: "suspended",
                                        platforms: ["facebook", "instagram", "linkedin", "x"]
                                    },
                                    {
                                        letter: "L",
                                        name: "Lisa Thompson",
                                        email: "lisa@beautybar.com",
                                        industry: "Beauty & Spa",
                                        plan: "Monthly",
                                        posts: "45",
                                        violations: "3",
                                        status: "blocked",
                                        platforms: ["instagram"]
                                    }
                                ].map((user, index) => (
                                    <div key={index} className="bg-white p-6 rounded-xl shadow space-y-4">

                                        {/* Top Section */}
                                        <div className="flex justify-between">
                                            <div className="flex gap-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center text-white font-bold">
                                                    {user.letter}
                                                </div>
                                                <div>
                                                    <h2 className="text-black">{user.name}</h2>
                                                    <p className="text-sm text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                            <MoreVertical className="text-gray-400 cursor-pointer" />
                                        </div>

                                        {/* Info Section */}
                                        <div className="space-y-2 text-sm text-black">
                                            <div className="flex justify-between">
                                                <span>Industry</span><span>{user.industry}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Plan</span>
                                                <span className="px-2 py-1 text-purple-600 bg-purple-100 rounded-md">
                                                    {user.plan}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Total Posts</span><span>{user.posts}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Violations</span>
                                                <span className={user.violations === "0" ? "text-green-600" : "text-red-600"}>
                                                    {user.violations}
                                                </span>
                                            </div>

                                            {/* Status */}
                                            <div className="flex justify-between">
                                                <span>Status</span>
                                                {user.status === "active" && (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-600 rounded-md">
                                                        <CheckCircle size={14} /> active
                                                    </span>
                                                )}
                                                {user.status === "suspended" && (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-600 rounded-md">
                                                        <Ban size={14} /> suspended
                                                    </span>
                                                )}
                                                {user.status === "blocked" && (
                                                    <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-md">
                                                        <XCircle size={14} /> blocked
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <hr />

                                        {/* Connected Platforms */}
                                        <div>
                                            <p className="text-sm font-medium mb-2 text-black">Connected Platforms</p>
                                            <div className="flex gap-3 text-xl">
                                                {user.platforms.includes("facebook") && <FaFacebook className="text-blue-600" />}
                                                {user.platforms.includes("instagram") && <FaInstagram className="text-pink-500" />}
                                                {user.platforms.includes("linkedin") && <FaLinkedin className="text-blue-700" />}
                                                {user.platforms.includes("x") && <FaXTwitter className="text-black" />}
                                            </div>
                                        </div>

                                    </div>
                                ))}

                            </div>

                        </div>

                    )}
                    {activeTab === "Content Moderation" && (
                        <div className="space-y-8">

                            {/* Top Filter Buttons */}
                            <div className="flex gap-4">
                                <button className="px-4 py-2 border border-gray-300 bg-white text-black rounded-md">
                                    All Content
                                </button>

                                <button className="px-4 py-2 bg-yellow-600 text-white rounded-md">
                                    Pending Review (2)
                                </button>

                                <button className="px-4 py-2 border border-gray-300 bg-white text-black rounded-md">
                                    Flagged (2)
                                </button>
                            </div>

                            {/* Cards */}
                            <div className="grid grid-cols-2 gap-8">

                                {/* ================= FIRST CARD ================= */}
                                <div className="bg-white rounded-xl shadow overflow-hidden">

                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                                            className="w-full h-56 object-cover"
                                        />
                                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm">
                                            <AlertTriangle size={14} />
                                            Flagged
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">

                                        {/* User Info */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="font-semibold text-black">James Wilson</h2>
                                                <p className="text-sm text-gray-500">Real Estate</p>
                                            </div>
                                            <FaFacebook className="text-blue-600 text-xl" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex items-start gap-2 text-black">
                                            <MessageCircle size={18} />
                                            <p>
                                                GET RICH QUICK! Buy now or regret forever! Limited slots! 🏠💰
                                            </p>
                                        </div>

                                        <p className="text-gray-600 text-sm">
                                            ##realestate #luxury #investment #money
                                        </p>

                                        {/* Flag Reason Card */}
                                        <div className="bg-red-100 p-4 rounded-md text-red-600 text-sm space-y-2">
                                            <p className="font-medium">Flagged for:</p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                                Fake financial promises
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                                Fake financial promises
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        {/* Buttons */}
                                        <div className="flex gap-4">

                                            <button className="flex-[7] bg-blue-100 text-blue-600 py-2 rounded-md flex items-center justify-center gap-2">
                                                <Eye size={16} /> Review
                                            </button>

                                            <button className="flex-[1.5] bg-green-100 text-green-600 py-2 rounded-md flex justify-center">
                                                <CheckCircle size={18} />
                                            </button>

                                            <button className="flex-[1.5] bg-red-100 text-red-600 py-2 rounded-md flex justify-center">
                                                <XCircle size={18} />
                                            </button>

                                        </div>

                                    </div>
                                </div>

                                {/* ================= SECOND CARD ================= */}
                                <div className="bg-white rounded-xl shadow overflow-hidden">

                                    {/* Image */}
                                    <div className="relative">
                                        <img
                                            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
                                            className="w-full h-56 object-cover"
                                        />
                                        <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md flex items-center gap-1 text-sm">
                                            <AlertTriangle size={14} />
                                            Flagged
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">

                                        {/* User Info */}
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <h2 className="font-semibold text-black">Lisa Thompson</h2>
                                                <p className="text-sm text-gray-500">Beauty & Spa</p>
                                            </div>
                                            <FaInstagram className="text-pink-500 text-xl" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex items-start gap-2 text-black">
                                            <MessageCircle size={18} />
                                            <p>
                                                Unwind and relax at our exclusive spa. Wine and beauty treatments! 🍷💅
                                            </p>
                                        </div>

                                        <p className="text-gray-600 text-sm">
                                            ##beauty #spa #wellness #lifestyle
                                        </p>

                                        {/* Flag Reason Card */}
                                        <div className="bg-red-100 p-4 rounded-md text-red-600 text-sm space-y-2">
                                            <p className="font-medium">Flagged for:</p>
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                                                Alcohol reference
                                            </div>
                                        </div>

                                        {/* Buttons */}
                                        {/* Buttons */}
                                        <div className="flex gap-4">

                                            <button className="flex-[7] bg-blue-100 text-blue-600 py-2 rounded-md flex items-center justify-center gap-2">
                                                <Eye size={16} /> Review
                                            </button>

                                            <button className="flex-[1.5] bg-green-100 text-green-600 py-2 rounded-md flex justify-center">
                                                <CheckCircle size={18} />
                                            </button>

                                            <button className="flex-[1.5] bg-red-100 text-red-600 py-2 rounded-md flex justify-center">
                                                <XCircle size={18} />
                                            </button>

                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    )}
                    {activeTab === "Schedule Posts" && (
                        <>
                            {/* Scheduled Posts Content */}
                            <div className="p-6 bg-gray-50 min-h-screen">

                                {/* Top Tabs + Search */}
                                <div className="flex justify-between items-center mb-6">

                                    {/* Tabs */}
                                    <div className="bg-white border border-gray-300 rounded-md flex overflow-hidden">
                                        {["Today", "This Week", "This Month", "All"].map((tab) => (
                                            <button
                                                key={tab}
                                                className={`px-4 py-2 text-sm font-medium ${tab === "All"
                                                    ? "bg-purple-600 text-white"
                                                    : "text-black hover:bg-gray-100"
                                                    }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Filter + Search */}
                                    <div className="flex items-center gap-3">
                                        <Filter size={18} className="text-black" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-4 gap-6 mb-6 text-black">
                                    <div className="bg-white p-4 rounded-md shadow-sm">
                                        <p className="text-sm">Next 24 Hours</p>
                                        <p className="text-xl mt-2">156 posts</p>
                                    </div>

                                    <div className="bg-white p-4 rounded-md shadow-sm">
                                        <p className="text-sm">This Week</p>
                                        <p className="text-xl mt-2">1,823 posts</p>
                                    </div>

                                    <div className="bg-white p-4 rounded-md shadow-sm">
                                        <p className="text-sm">Active Users</p>
                                        <p className="text-xl mt-2">1,189</p>
                                    </div>

                                    <div className="bg-white p-4 rounded-md shadow-sm">
                                        <p className="text-sm text-black">Paused Posts</p>
                                        <p className="text-xl mt-2 text-yellow-500">12</p>
                                    </div>
                                </div>

                                <hr className="border-gray-300 mb-6" />

                                {/* Date Header */}
                                <div className="flex items-center gap-2 mb-4 text-black">
                                    <CalendarDays size={18} className="text-purple-600" />
                                    <p className="font-medium">12/15/2024 (5 posts)</p>
                                </div>

                                {/* Posts Card */}
                                <div className="bg-white rounded-md shadow-sm divide-y divide-gray-300 text-black">

                                    {posts.map((post, index) => (
                                        <div key={index} className="p-4 flex justify-between items-start">

                                            <div className="flex gap-4">
                                                <img
                                                    src={post.image}
                                                    alt={post.name}
                                                    className="w-14 h-14 rounded-md object-cover"
                                                />


                                                <div>
                                                    <p className="">{post.name}</p>
                                                    <p className="text-sm text-gray-500">{post.category}</p>

                                                    <p className="mt-2 text-sm">{post.message}</p>

                                                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                                        <Clock size={14} />
                                                        {post.time}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                {post.platform === "instagram" && (
                                                    <Instagram size={18} className="text-pink-500" />
                                                )}
                                                {post.platform === "facebook" && (
                                                    <Facebook size={18} className="text-blue-600" />
                                                )}
                                                {post.platform === "linkedin" && (
                                                    <Linkedin size={18} className="text-blue-700" />
                                                )}

                                                <Pause size={18} className="text-yellow-500 cursor-pointer" />
                                                <Calendar size={18} className="text-blue-600 cursor-pointer" />
                                                <Trash2 size={18} className="text-red-600 cursor-pointer" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

