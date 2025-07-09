import React from 'react';
import { 
  TrendingUp, 
  Receipt, 
  DollarSign, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Receipts',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Receipt,
      color: 'text-blue-600'
    },
    {
      title: 'Monthly Spending',
      value: '₹45,678',
      change: '-8%',
      trend: 'down',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'This Month',
      value: '₹12,345',
      change: '+15%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. per Day',
      value: '₹456',
      change: '+3%',
      trend: 'up',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

  const recentReceipts = [
    { store: 'BigBasket', amount: '₹2,345', date: '2 hours ago', category: 'Groceries' },
    { store: 'Zomato', amount: '₹456', date: '1 day ago', category: 'Food & Dining' },
    { store: 'Amazon', amount: '₹1,234', date: '2 days ago', category: 'Electronics' },
    { store: 'DMart', amount: '₹678', date: '3 days ago', category: 'Groceries' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Welcome back! Here's your spending overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Receipts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Receipts</h3>
          <p className="text-sm text-gray-600">Your latest transactions</p>
        </div>
        <div className="divide-y divide-gray-200">
          {recentReceipts.map((receipt, index) => (
            <div key={index} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{receipt.store}</h4>
                  <p className="text-sm text-gray-600">{receipt.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{receipt.amount}</p>
                <p className="text-sm text-gray-500">{receipt.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};