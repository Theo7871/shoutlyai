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
    const [activeTab, setActiveTab] = useState("System Health");

    const menus = [
        { name: "User Management", icon: Users },
        { name: "Billing & Revenue", icon: CreditCard },
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
                            <span className="text-blue-600 font-bold text-lg">E</span>
                        </div>
                        <div>
                            <h2 className="text-black font-medium">Emma Finance</h2>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-yellow-600 rounded-md">
                                Finance Admin
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
                        <p className="text-black font-medium">Emma Finance</p>
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
                </div>
            </main>
        </div>
    );
}

