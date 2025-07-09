import React from 'react';
import { TrendingUp, PieChart, BarChart3, Calendar } from 'lucide-react';

export const Analytics: React.FC = () => {
  const categories = [
    { name: 'Groceries', amount: 15420, percentage: 45, color: 'bg-blue-500' },
    { name: 'Dining', amount: 8760, percentage: 25, color: 'bg-green-500' },
    { name: 'Shopping', amount: 6240, percentage: 18, color: 'bg-purple-500' },
    { name: 'Transportation', amount: 2580, percentage: 8, color: 'bg-orange-500' },
    { name: 'Others', amount: 1380, percentage: 4, color: 'bg-red-500' },
  ];

  const monthlyData = [
    { month: 'Jan', amount: 28000 },
    { month: 'Feb', amount: 32000 },
    { month: 'Mar', amount: 26000 },
    { month: 'Apr', amount: 34000 },
    { month: 'May', amount: 29000 },
    { month: 'Jun', amount: 35000 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Spending Analytics</h2>
        <p className="text-gray-600">Insights into your spending patterns</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">₹34,380</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. per Day</p>
              <p className="text-2xl font-bold text-gray-900">₹1,146</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Spending by Category</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${category.color}`} />
                  <span className="font-medium text-gray-900">{category.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">₹{category.amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{category.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full flex">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className={`${category.color} transition-all duration-300`}
                  style={{ width: `${category.percentage}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Spending Trends</h3>
        </div>
        <div className="p-6">
          <div className="flex items-end space-x-4 h-48">
            {monthlyData.map((month, index) => (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(month.amount / 35000) * 100}%` }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-sm font-medium text-gray-900">{month.month}</p>
                  <p className="text-xs text-gray-500">₹{month.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};