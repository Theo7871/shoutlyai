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
    const [activeTab, setActiveTab] = useState("Dashboard");

    const menus = [
        { name: "Dashboard", icon: LayoutDashboard },
        { name: "User Management", icon: Users },
        { name: "Content Moderation", icon: ShieldCheck },
        { name: "Schedule Posts", icon: CalendarClock },
        { name: "Audit Logs", icon: FileText },
        { name: "System Health", icon: Activity },
        { name: "Billing & Revenue", icon: CreditCard },
        { name: "Settings", icon: Settings },
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
                            <span className="text-blue-600 font-bold text-lg">J</span>
                        </div>
                        <div>
                            <h2 className="text-black font-medium">John Doe</h2>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-violet-600 rounded-md">
                                Super Admin
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
                        <p className="text-black font-medium">John Doe</p>
                        <p className="text-sm text-gray-500">admin@shoutly.ai</p>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {activeTab === "Dashboard" && (
                        <>
                            {/* 4 Stats Cards */}
                            <div className="grid grid-cols-4 gap-6">
                                {/* Card 1 */}
                                <div className="bg-white p-6 rounded-xl shadow relative">
                                    <Users className="absolute top-4 right-4 text-blue-600 bg-blue-100 p-2 rounded-md" size={36} />
                                    <p className="text-gray-500 text-sm">Total Users</p>
                                    <h2 className="text-2xl text-black">1,247</h2>
                                    <div className="flex items-center text-green-600 text-sm mt-2">
                                        <TrendingUp size={16} className="mr-1" /> +12%
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-white p-6 rounded-xl shadow relative">
                                    <FileText className="absolute top-4 right-4 text-green-600 bg-green-100 p-2 rounded-md" size={36} />
                                    <p className="text-gray-500 text-sm">Posts Today</p>
                                    <h2 className="text-2xl text-black">453</h2>
                                    <div className="flex items-center text-green-600 text-sm mt-2">
                                        <TrendingUp size={16} className="mr-1" /> +8%
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="bg-white p-6 rounded-xl shadow relative">
                                    <AlertTriangle className="absolute top-4 right-4 text-red-600 bg-red-100 p-2 rounded-md" size={36} />
                                    <p className="text-gray-500 text-sm">Flagged Content</p>
                                    <h2 className="text-2xl text-black">23</h2>
                                    <div className="flex items-center text-green-600 text-sm mt-2">
                                        <TrendingUp size={16} className="mr-1" /> -15%
                                    </div>
                                </div>

                                {/* Card 4 */}
                                <div className="bg-white p-6 rounded-xl shadow relative">
                                    <DollarSign className="absolute top-4 right-4 text-violet-600 bg-violet-100 p-2 rounded-md" size={36} />
                                    <p className="text-gray-500 text-sm">Monthly Revenue</p>
                                    <h2 className="text-2xl text-black">$124.8K</h2>
                                    <div className="flex items-center text-green-600 text-sm mt-2">
                                        <TrendingUp size={16} className="mr-1" /> +23%
                                    </div>
                                </div>
                            </div>

                            {/* 3 Middle Cards */}
                            <div className="grid grid-cols-3 gap-6">
                                {/* Platform Health */}
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="flex items-center gap-2 text-green-600 mb-4">
                                        <Activity size={18} /> Platform Health
                                    </h3>
                                    {["API Status", "AI Generation", "Publishing"].map((item) => (
                                        <div key={item} className="flex justify-between mb-2">
                                            <span className="text-black">{item}</span>
                                            <span className="flex items-center text-green-600">
                                                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                                                Operational
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Scheduled Posts */}
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="flex items-center gap-2 text-violet-600 mb-4">
                                        <CalendarClock size={18} /> Scheduled Posts
                                    </h3>
                                    <div className="flex text-black justify-between mb-2">
                                        <span>Next 24 Hours</span><span>156</span>
                                    </div>
                                    <div className="flex text-black justify-between mb-2">
                                        <span>This Week</span><span>1,823</span>
                                    </div>
                                    <div className="flex text-black justify-between">
                                        <span>Failed Today</span><span className="text-red-600">3</span>
                                    </div>
                                </div>

                                {/* User Status */}
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <h3 className="flex items-center gap-2 text-green-600 mb-4">
                                        <CheckCircle size={18} /> User Status
                                    </h3>
                                    <div className="flex text-black justify-between mb-2">
                                        <span>Active Users</span><span className="text-green-600">1189</span>
                                    </div>
                                    <div className="flex text-black justify-between mb-2">
                                        <span>Suspended</span><span className="text-yellow-600">42</span>
                                    </div>
                                    <div className="flex text-black justify-between">
                                        <span>Blocked</span><span className="text-red-600">16</span>
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="bg-white text-black p-6 rounded-xl shadow">
                                <h3 className="font-semibold mb-4">Recent Content Activity</h3>
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-200">
                                        <tr className="text-left">
                                            <th className="py-2">User</th>
                                            <th>Industry</th>
                                            <th>Platform</th>
                                            <th>Safety Status</th>
                                            <th>Status</th>
                                            <th>Scheduled</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            ["Mike Chen", "Fitness", "Instagram", "safe", "approved"],
                                            ["James Wilson", "Real Estate", "Facebook", "review required", "pending"],
                                            ["Dr. Sarah Johnson", "Dentistry", "LinkedIn", "safe", "approved"],
                                            ["Lisa Thompson", "Beauty & Spa", "Instagram", "review required", "pending"],
                                            ["Emily Rodriguez", "Restaurant", "Instagram", "safe", "approved"],
                                        ].map((row, i) => (
                                            <tr key={i} className="border-b border-gray-200">
                                                <td className="py-3">{row[0]}</td>
                                                <td>{row[1]}</td>
                                                <td>{row[2]}</td>
                                                <td>
                                                    {row[3] === "safe" ? (
                                                        <span className="text-green-600 flex items-center">
                                                            <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span> safe
                                                        </span>
                                                    ) : (
                                                        <span className="text-yellow-600 flex items-center">
                                                            <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span> review required
                                                        </span>
                                                    )}
                                                </td>
                                                <td>
                                                    {row[4] === "approved" ? (
                                                        <span className="px-2 py-1 text-green-600 bg-green-100 rounded-md text-xs">
                                                            approved
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 py-1 text-yellow-600 bg-yellow-100 rounded-md text-xs">
                                                            pending
                                                        </span>
                                                    )}
                                                </td>
                                                <td>12/15/2024 10:00:00 AM</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
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
                    {activeTab === "Audit Logs" && (
                        <div className="p-6 bg-gray-50 min-h-screen">

                            {/* Top Search + Export */}
                            <div className="flex justify-between items-center mb-6">

                                {/* Search */}
                                <div className="relative w-80">
                                    <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search logs . . ."
                                        className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none"
                                    />
                                </div>

                                {/* Filter + Export */}
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
                                    />
                                    <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm">
                                        <Download size={16} />
                                        Export
                                    </button>
                                </div>
                            </div>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-4 gap-6 mb-6 text-black">

                                <div className="bg-white p-4 rounded-md shadow-sm">
                                    <p className="text-sm">Total Actions (24h)</p>
                                    <p className="text-xl mt-2">247</p>
                                </div>

                                <div className="bg-white p-4 rounded-md shadow-sm">
                                    <p className="text-sm">Content Approved</p>
                                    <p className="text-xl  mt-2 text-green-600">189</p>
                                </div>

                                <div className="bg-white p-4 rounded-md shadow-sm">
                                    <p className="text-sm">Content Rejected</p>
                                    <p className="text-xl mt-2 text-red-600">23</p>
                                </div>

                                <div className="bg-white p-4 rounded-md shadow-sm">
                                    <p className="text-sm text-yellow-600">User Actions</p>
                                    <p className="text-xl mt-2 text-yellow-600">35</p>
                                </div>

                            </div>

                            {/* Audit Trail Card */}
                            <div className="bg-white text-black rounded-md shadow-sm p-6 mb-6">

                                <h2 className="text-lg font-semibold mb-4">Audit Trail</h2>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-gray-300 text-left">
                                                <th className="py-3">Timestamp</th>
                                                <th>Admin</th>
                                                <th>Action</th>
                                                <th>Target</th>
                                                <th>Details</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">

                                            {[1, 2, 3, 4].map((row, index) => (
                                                <tr key={index} className="align-top">

                                                    {/* Timestamp */}
                                                    <td className="py-4">
                                                        <div className="flex items-start gap-2">
                                                            <Clock size={14} className="mt-1" />
                                                            <div>
                                                                <p>12/14/2024,</p>
                                                                <p>10:30:00 AM</p>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    {/* Admin */}
                                                    <td className="py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                                                                A
                                                            </div>
                                                            <p>admin@shoutly.ai</p>
                                                        </div>
                                                    </td>

                                                    {/* Action */}
                                                    <td className="py-4">
                                                        {index === 0 && (
                                                            <div className="bg-red-100 text-red-600 px-3 py-1 rounded-md inline-flex items-center gap-2">
                                                                <FileX size={14} />
                                                                Rejected Content
                                                            </div>
                                                        )}
                                                        {index === 1 && (
                                                            <div className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-md inline-flex items-center gap-2">
                                                                <User size={14} />
                                                                Suspended User
                                                            </div>
                                                        )}
                                                        {index === 2 && (
                                                            <div className="bg-green-100 text-green-600 px-3 py-1 rounded-md inline-flex items-center gap-2">
                                                                <CheckCircle size={14} />
                                                                Approved Content
                                                            </div>
                                                        )}
                                                        {index === 3 && (
                                                            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md inline-flex items-center gap-2">
                                                                <Filter size={14} />
                                                                Added Keyword
                                                            </div>
                                                        )}
                                                    </td>

                                                    {/* Target */}
                                                    <td className="py-4">
                                                        James Wilson
                                                    </td>

                                                    {/* Details */}
                                                    <td className="py-4">
                                                        Flagged for fake financial promises.
                                                    </td>

                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Retention Info Card */}
                            <div className="bg-blue-50 rounded-md p-6">

                                <div className="flex items-start gap-3">
                                    <FileText size={18} className="text-blue-600 mt-1" />

                                    <div>
                                        <p className="text-blue-700">
                                            Audit Log Retention
                                        </p>

                                        <p className="text-blue-700 mt-2 text-sm">
                                            All admin actions are logged and retained for 90 days for compliance and dispute resolution.
                                            Logs can be exported in CSV format for external archiving.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )}

                    {activeTab === "System Health" && (
                        <div className="p-6 bg-gray-50 min-h-screen">

                            {/* Top Health Cards */}
                            <div className="grid grid-cols-4 gap-6 mb-6 text-black">

                                {[
                                    { title: "CPU Usage", value: "42%" },
                                    { title: "Memory Usage", value: "68%" },
                                    { title: "Disk Usage", value: "54%" },
                                    { title: "Network Traffic", value: "2.3 GB/hr" },
                                ].map((item, index) => (
                                    <div key={index} className="bg-white p-5 rounded-md shadow-sm relative">

                                        <div className="absolute top-4 right-4 bg-green-100 p-2 rounded-md">
                                            <TrendingUp size={18} className="text-green-600" />
                                        </div>

                                        <p className="text-sm">{item.title}</p>
                                        <p className="text-2xl mt-2">{item.value}</p>
                                        <p className="text-green-600 text-sm mt-1">Healthy</p>

                                    </div>
                                ))}

                            </div>

                            {/* Service Status */}
                            <div className="bg-white rounded-md shadow-sm p-6 mb-6 text-black">

                                <h2 className="text-lg font-semibold mb-4">Service Status</h2>

                                <div className="divide-y divide-gray-200">

                                    {[...Array(8)].map((_, index) => (
                                        <div key={index} className="grid grid-cols-3 py-4">

                                            {/* Column 1 */}
                                            <div className="flex gap-3">
                                                <div>
                                                    {index === 3 ? (
                                                        <AlertTriangle size={18} className="text-yellow-500 mt-1" />
                                                    ) : (
                                                        <CheckCircle size={18} className="text-green-600 mt-1" />
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-medium">AI Generation API</p>
                                                    <p className="text-sm text-gray-500">Last checked: 2 mins ago</p>
                                                    <p className="text-sm mt-1">uptime</p>
                                                    <p className="text-sm">99.9%</p>
                                                </div>
                                            </div>

                                            {/* Column 2 */}
                                            <div>
                                                <p>Response time</p>
                                                <p className="mt-1">125ms</p>
                                            </div>

                                            {/* Column 3 */}
                                            <div>
                                                {index === 3 ? (
                                                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-md text-sm">
                                                        degraded
                                                    </span>
                                                ) : (
                                                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-md text-sm">
                                                        Operational
                                                    </span>
                                                )}
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            </div>

                            {/* Bottom 3 Cards */}
                            <div className="grid grid-cols-3 gap-6">

                                {/* API Performance */}
                                <div className="bg-white p-6 rounded-md shadow-sm text-black">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Activity size={18} className="text-blue-600" />
                                        <h3 className="">API Performance</h3>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>Requests/min</span>
                                            <span>1,247</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Success Rate</span>
                                            <span className="text-green-600">99.2%</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Avg Response</span>
                                            <span>156ms</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Queue Status */}
                                <div className="bg-white p-6 rounded-md shadow-sm text-black">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Zap size={18} className="text-yellow-500" />
                                        <h3 className="">Queue Status</h3>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>Pending Jobs</span>
                                            <span>156</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Processing</span>
                                            <span className="text-blue-600">42</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Failed (24)</span>
                                            <span className="text-red-600">3</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Database */}
                                <div className="bg-white p-6 rounded-md shadow-sm text-black">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Database size={18} className="text-purple-600" />
                                        <h3 className="">Database</h3>
                                    </div>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span>Connections</span>
                                            <span>45/100</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Query Time</span>
                                            <span>12ms avg</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Storage</span>
                                            <span>234 GB</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    )}
                    {activeTab === "Billing & Revenue" && (
                        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

                            {/* ===================== TOP 4 CARDS ===================== */}
                            <div className="grid grid-cols-4 gap-6">

                                {/* Card 1 */}
                                <div className="bg-white p-6 rounded-xl shadow-sm relative">
                                    <div className="absolute top-4 right-4 bg-green-100 p-2 rounded-lg">
                                        <DollarSign className="text-green-600" size={20} />
                                    </div>
                                    <p className="text-black">Monthly Revenue</p>
                                    <h2 className="text-xl text-black mt-2">$124,750</h2>
                                    <div className="flex items-center text-green-600 mt-2 text-sm">
                                        <ArrowUpRight size={16} className="mr-1" />
                                        +23%
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="bg-white p-6 rounded-xl shadow-sm relative">
                                    <div className="absolute top-4 right-4 bg-blue-100 p-2 rounded-lg">
                                        <Users className="text-blue-600" size={20} />
                                    </div>
                                    <p className="text-black">Active Subscriptions</p>
                                    <h2 className="text-xl text-black mt-2">1,189</h2>
                                    <div className="flex items-center text-green-600 mt-2 text-sm">
                                        <ArrowUpRight size={16} className="mr-1" />
                                        +12%
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="bg-white p-6 rounded-xl shadow-sm relative">
                                    <div className="absolute top-4 right-4 bg-violet-100 p-2 rounded-lg">
                                        <LineChart className="text-violet-600" size={20} />
                                    </div>
                                    <p className="text-black">Yearly Plans</p>
                                    <h2 className="text-xl text-black mt-2">2</h2>
                                    <div className="flex items-center text-green-600 mt-2 text-sm">
                                        <ArrowUpRight size={16} className="mr-1" />
                                        +18%
                                    </div>
                                </div>

                                {/* Card 4 */}
                                <div className="bg-white p-6 rounded-xl shadow-sm relative">
                                    <div className="absolute top-4 right-4 bg-purple-100 p-2 rounded-lg">
                                        <TrendingUp className="text-purple-600" size={20} />
                                    </div>
                                    <p className="text-black">Avg Revenue/User</p>
                                    <h2 className="text-xl text-black mt-2">$104.92</h2>
                                    <div className="flex items-center text-green-600 mt-2 text-sm">
                                        <ArrowUpRight size={16} className="mr-1" />
                                        +5%
                                    </div>
                                </div>

                            </div>

                            {/* ===================== PLAN + USAGE ===================== */}
                            <div className="grid grid-cols-2 gap-6">

                                {/* Plan Distribution */}
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-black mb-6">
                                        Plan Distribution
                                    </h3>

                                    {/* Monthly */}
                                    <div className="flex justify-between text-black text-sm">
                                        <span>Monthly Plan ($59/mo)</span>
                                        <span>2</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2 mb-4">
                                        <div className="bg-blue-500 h-2 rounded-full w-2/3"></div>
                                    </div>

                                    {/* Yearly */}
                                    <div className="flex justify-between text-black text-sm">
                                        <span>Yearly plan ($599/yr)</span>
                                        <span>1</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                        <div className="bg-violet-500 h-2 rounded-full w-1/3"></div>
                                    </div>
                                </div>

                                {/* Usage Metrics */}
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h3 className="text-black mb-6">
                                        Usage Metrics
                                    </h3>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between text-black">
                                            <span>Posts Generated</span>
                                            <span>12,453</span>
                                        </div>
                                        <div className="flex justify-between text-black">
                                            <span>Posts Published</span>
                                            <span>34,521</span>
                                        </div>
                                        <div className="flex justify-between text-black">
                                            <span>Avg Posts/User/Month</span>
                                            <span>27.6</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-black">Renewal Rate</span>
                                            <span className="text-green-600">87%</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* ===================== RECENT TRANSACTIONS ===================== */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-black font-semibold mb-6">
                                    Recent Transactions
                                </h3>

                                <table className="w-full text-sm text-left">
                                    <thead>
                                        <tr className="border-b text-gray-600">
                                            <th className="pb-3">User</th>
                                            <th className="pb-3">Plan</th>
                                            <th className="pb-3">Amount</th>
                                            <th className="pb-3">Date</th>
                                            <th className="pb-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-black border-gray-300">

                                        <tr className="border-b">
                                            <td className="py-3">Dr. Sarah Johnson</td>
                                            <td>Yearly</td>
                                            <td>$599</td>
                                            <td>2024-12-14</td>
                                            <td>
                                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>

                                        <tr className="border-b">
                                            <td className="py-3">Mike Chen</td>
                                            <td>Monthly</td>
                                            <td>$59</td>
                                            <td>2024-12-14</td>
                                            <td>
                                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>

                                        <tr className="border-b">
                                            <td className="py-3">Emily Rodriguez</td>
                                            <td>Monthly</td>
                                            <td>$599</td>
                                            <td>2024-12-13</td>
                                            <td>
                                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>

                                        <tr className="border-b">
                                            <td className="py-3">James Wilson</td>
                                            <td>Yearly</td>
                                            <td>$59</td>
                                            <td>2024-12-13</td>
                                            <td>
                                                <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                                                    Refunded
                                                </span>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td className="py-3">Lisa Thompson</td>
                                            <td>Monthly</td>
                                            <td>$599</td>
                                            <td>2024-12-12</td>
                                            <td>
                                                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs">
                                                    Completed
                                                </span>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    )
                    }
                    {activeTab === "Settings" && (
                        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">

                            {/* ===================== EMERGENCY CONTROLS ===================== */}
                            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                                <div className="flex items-center gap-3">
                                    <ShieldAlert className="text-red-600" size={22} />
                                    <h2 className="text-black font-semibold text-lg">
                                        Emergency Controls
                                    </h2>
                                </div>

                                {/* Emergency Stop Card */}
                                <div className="bg-red-50 p-6 rounded-lg relative">
                                    <button className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
                                        Stop All Posts
                                    </button>
                                    <p className="text-black font-medium">
                                        Emergency Stop - All Publishing
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Immediately halt all scheduled posts across all platforms
                                    </p>
                                </div>
                            </div>

                            {/* ===================== PLATFORM PAUSE CARDS ===================== */}
                            <div className="grid grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="bg-white p-6 rounded-xl shadow-sm">
                                        <h3 className="text-black font-medium">
                                            Pause Instagram Publishing
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Temporarily disabled Instagram posts.
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* ===================== RESTRICTED KEYWORDS ===================== */}
                            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                                <h2 className="text-black font-semibold text-lg">
                                    Restricted Keywords & Phrases
                                </h2>

                                {/* Add New Keyword */}
                                <div className="space-y-3">
                                    <label className="text-sm text-black">
                                        Add New Restricted Keyword
                                    </label>

                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            placeholder="Enter keyword or phrase..."
                                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                        />
                                        <input
                                            type="text"
                                            className="w-40 border border-gray-300 rounded-lg px-4 py-2 text-sm"
                                        />
                                        <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm">
                                            <Plus size={16} />
                                            Add
                                        </button>
                                    </div>
                                </div>

                                {/* Keyword Cards */}
                                <div className="space-y-4">

                                    {/* Card 1 */}
                                    <div className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
                                        <div>
                                            <p className="text-black font-medium">Adult Content</p>

                                            <div className="flex items-center gap-2 mt-2 bg-red-50 px-3 py-1 rounded-md w-fit">
                                                <p className="text-red-600 text-sm">porn</p>
                                                <Trash2 className="text-red-600 cursor-pointer" size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
                                        <div>
                                            <p className="text-black font-medium">Drugs & Alcohol</p>

                                            <div className="flex items-center gap-2 mt-2 bg-orange-50 px-3 py-1 rounded-md w-fit">
                                                <p className="text-orange-500 text-sm">drugs</p>
                                                <Trash2 className="text-orange-500 cursor-pointer" size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 3 */}
                                    <div className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
                                        <div>
                                            <p className="text-black font-medium">Violence</p>

                                            <div className="flex items-center gap-2 mt-2 bg-red-50 px-3 py-1 rounded-md w-fit">
                                                <p className="text-red-600 text-sm">violence</p>
                                                <Trash2 className="text-red-600 cursor-pointer" size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 4 */}
                                    <div className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
                                        <div>
                                            <p className="text-black font-medium">Hate Speech</p>

                                            <div className="flex items-center gap-2 mt-2 bg-violet-50 px-3 py-1 rounded-md w-fit">
                                                <p className="text-violet-600 text-sm">hate</p>
                                                <Trash2 className="text-violet-600 cursor-pointer" size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 5 */}
                                    <div className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
                                        <div>
                                            <p className="text-black font-medium">Gambling</p>

                                            <div className="flex items-center gap-2 mt-2 bg-yellow-50 px-3 py-1 rounded-md w-fit">
                                                <p className="text-yellow-600 text-sm">gambling</p>
                                                <Trash2 className="text-yellow-600 cursor-pointer" size={16} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card 6 */}
                                    <div className="bg-white p-4 rounded-lg flex justify-between items-center shadow-sm">
                                        <div>
                                            <p className="text-black font-medium">Other</p>

                                            <div className="flex items-center gap-2 mt-2 bg-gray-100 px-3 py-1 rounded-md w-fit">
                                                <p className="text-black text-sm">get rich quick</p>
                                                <Trash2 className="text-black cursor-pointer" size={16} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* ===================== CONTENT MODERATION ===================== */}
                            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                                <h2 className="text-black font-semibold text-lg">
                                    Content Moderation Settings
                                </h2>

                                {[
                                    {
                                        title: "Auto-Approve Trusted Users",
                                        desc: "Users with no violations get automatic approval",
                                    },
                                    {
                                        title: "Require Review for New Users",
                                        desc: "First 10 posts from new users require manual review",
                                    },
                                    {
                                        title: "AI-Safety Scanner",
                                        desc: "Use AI to detect potentially harmful content",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                                    >
                                        <div>
                                            <p className="text-black font-medium">{item.title}</p>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>

                                        {/* Purple Toggle */}
                                        <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* ===================== INDUSTRY MANAGEMENT ===================== */}
                            <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                                <h2 className="text-black font-semibold text-lg">
                                    Industry Management
                                </h2>

                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        "Dentistry",
                                        "Fitness",
                                        "Restaurant",
                                        "Real Estate",
                                        "Beauty & Spa",
                                        "Healthcare",
                                    ].map((industry, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                                        >
                                            <p className="text-black font-medium">{industry}</p>

                                            {/* Purple Toggle */}
                                            <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

