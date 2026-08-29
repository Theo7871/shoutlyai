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
        { name: "System Health", icon: Activity },
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
                            <span className="text-blue-600 font-bold text-lg">D</span>
                        </div>
                        <div>
                            <h2 className="text-black font-medium">Devid Tech</h2>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-green-600 rounded-md">
                                Technical Admin
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
                        <p className="text-black font-medium">Devid Tech</p>
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
                </div>
            </main>
        </div>
    );
}

