// import React, { useMemo } from 'react';
// import { Calendar, TrendingUp, BarChart3, Download } from 'lucide-react';
// import { Expense } from '../types';
// import { getWeekStart, getMonthStart, formatCurrency } from '../utils/dateUtils';
// import { generateExpenseReport } from '../utils/pdfGenerator';

// interface ExpenseBreakdownProps {
//   expenses: Expense[];
//   initialBalance: number;
//   currentBalance: number;
// }

// export const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ 
//   expenses, 
//   initialBalance, 
//   currentBalance 
// }) => {
//   const breakdown = useMemo(() => {
//     const now = new Date();
//     const weekStart = getWeekStart(now);
//     const monthStart = getMonthStart(now);

//     const weeklyExpenses = expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate >= weekStart;
//     });
    
//     const monthlyExpenses = expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate >= monthStart;
//     });

//     const weeklyTotal = weeklyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

//     // Group by categories for better visualization
//     const weeklyByCategory = weeklyExpenses.reduce((acc, expense) => {
//       const category = expense.label.toLowerCase();
//       acc[category] = (acc[category] || 0) + expense.amount;
//       return acc;
//     }, {} as Record<string, number>);

//     const monthlyByCategory = monthlyExpenses.reduce((acc, expense) => {
//       const category = expense.label.toLowerCase();
//       acc[category] = (acc[category] || 0) + expense.amount;
//       return acc;
//     }, {} as Record<string, number>);

//     return {
//       weekly: {
//         total: weeklyTotal,
//         count: weeklyExpenses.length,
//         categories: weeklyByCategory
//       },
//       monthly: {
//         total: monthlyTotal,
//         count: monthlyExpenses.length,
//         categories: monthlyByCategory
//       }
//     };
//   }, [expenses]);

//   const handleDownloadPDF = () => {
//     generateExpenseReport(expenses, initialBalance, currentBalance);
//   };

//   const CategoryBreakdown: React.FC<{ categories: Record<string, number>; total: number }> = ({ categories, total }) => {
//     const sortedCategories = Object.entries(categories)
//       .sort(([,a], [,b]) => b - a)
//       .slice(0, 5); // Show top 5 categories

//     if (sortedCategories.length === 0) {
//       return <p className="text-gray-500 text-sm">No expenses in this period</p>;
//     }

//     return (
//       <div className="space-y-2">
//         {sortedCategories.map(([category, amount]) => {
//           const percentage = total > 0 ? (amount / total) * 100 : 0;
//           return (
//             <div key={category} className="flex items-center justify-between">
//               <div className="flex items-center flex-1">
//                 <span className="text-sm text-gray-600 capitalize w-24 truncate">
//                   {category}
//                 </span>
//                 <div className="flex-1 mx-2">
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
//                       style={{ width: `${percentage}%` }}
//                     />
//                   </div>
//                 </div>
//               </div>
//               <span className="text-sm font-medium text-gray-800 ml-2">
//                 {formatCurrency(amount)}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Download Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleDownloadPDF}
//           className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
//         >
//           <Download className="w-4 h-4 mr-2" />
//           Download PDF Report
//         </button>
//       </div>
      
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//       {/* Weekly Breakdown */}
//       <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//           <Calendar className="w-5 h-5 mr-2 text-green-500" />
//           This Week
//         </h3>
        
//         <div className="mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Total Spent</span>
//             <span className="font-semibold text-green-600">
//               {formatCurrency(breakdown.weekly.total)}
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Transactions</span>
//             <span className="text-sm text-gray-800">{breakdown.weekly.count}</span>
//           </div>
//         </div>

//         <CategoryBreakdown 
//           categories={breakdown.weekly.categories} 
//           total={breakdown.weekly.total} 
//         />
//       </div>

//       {/* Monthly Breakdown */}
//       <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
//           <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
//           This Month
//         </h3>
        
//         <div className="mb-4">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm text-gray-600">Total Spent</span>
//             <span className="font-semibold text-purple-600">
//               {formatCurrency(breakdown.monthly.total)}
//             </span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Transactions</span>
//             <span className="text-sm text-gray-800">{breakdown.monthly.count}</span>
//           </div>
//         </div>

//         <CategoryBreakdown 
//           categories={breakdown.monthly.categories} 
//           total={breakdown.monthly.total} 
//         />
//       </div>
//       </div>
//     </div>
//   );
// };




import React, { useMemo, useState } from 'react';
import { Calendar, TrendingUp, BarChart3, Download, PieChart, LineChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart as RechartsBarChart, Bar, Legend } from 'recharts';

// Mock types since they're imported
interface Expense {
  id: string;
  amount: number;
  label: string;
  date: string;
  description?: string;
}

interface ExpenseBreakdownProps {
  expenses: Expense[];
  initialBalance: number;
  currentBalance: number;
}

// Mock utility functions
const getWeekStart = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

const getMonthStart = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

const generateExpenseReport = (expenses: Expense[], initialBalance: number, currentBalance: number) => {
  console.log('Generating PDF report...', { expenses, initialBalance, currentBalance });
  alert('PDF report would be generated here');
};

// Sample data for demonstration
const sampleExpenses: Expense[] = [
  { id: '1', amount: 45.50, label: 'Food', date: '2025-07-25', description: 'Lunch' },
  { id: '2', amount: 120.00, label: 'Transportation', date: '2025-07-24', description: 'Gas' },
  { id: '3', amount: 85.75, label: 'Entertainment', date: '2025-07-23', description: 'Movie' },
  { id: '4', amount: 200.00, label: 'Shopping', date: '2025-07-22', description: 'Clothes' },
  { id: '5', amount: 30.25, label: 'Food', date: '2025-07-21', description: 'Coffee' },
  { id: '6', amount: 75.00, label: 'Transportation', date: '2025-07-20', description: 'Uber' },
  { id: '7', amount: 155.40, label: 'Bills', date: '2025-07-19', description: 'Electric' },
  { id: '8', amount: 68.90, label: 'Food', date: '2025-07-18', description: 'Groceries' },
];

export const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ 
  expenses = sampleExpenses, 
  initialBalance = 5000, 
  currentBalance = 4200 
}) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly'>('weekly');
  const [chartType, setChartType] = useState<'pie' | 'bar' | 'trend'>('pie');

  const breakdown = useMemo(() => {
    const now = new Date();
    const weekStart = getWeekStart(now);
    const monthStart = getMonthStart(now);

    const weeklyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= weekStart;
    });
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate >= monthStart;
    });

    const weeklyTotal = weeklyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Group by categories for better visualization
    const weeklyByCategory = weeklyExpenses.reduce((acc, expense) => {
      const category = expense.label.toLowerCase();
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const monthlyByCategory = monthlyExpenses.reduce((acc, expense) => {
      const category = expense.label.toLowerCase();
      acc[category] = (acc[category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    // Create trend data for the last 7 days
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const trendData = last7Days.map(date => {
      const dayExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.toDateString() === date.toDateString();
      });
      const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        amount: total,
        fullDate: date.toISOString().split('T')[0]
      };
    });

    return {
      weekly: {
        total: weeklyTotal,
        count: weeklyExpenses.length,
        categories: weeklyByCategory
      },
      monthly: {
        total: monthlyTotal,
        count: monthlyExpenses.length,
        categories: monthlyByCategory
      },
      trendData
    };
  }, [expenses]);

  const handleDownloadPDF = () => {
    generateExpenseReport(expenses, initialBalance, currentBalance);
  };

  // Prepare chart data
  const currentCategories = activeTab === 'weekly' ? breakdown.weekly.categories : breakdown.monthly.categories;
  const currentTotal = activeTab === 'weekly' ? breakdown.weekly.total : breakdown.monthly.total;

  const pieChartData = Object.entries(currentCategories).map(([category, amount]) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    value: amount,
    percentage: ((amount / currentTotal) * 100).toFixed(1)
  }));

  const barChartData = Object.entries(currentCategories).map(([category, amount]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount: amount
  }));

  const COLORS = ['#8B5CF6', '#06D6A0', '#FFD166', '#EF476F', '#118AB2', '#073B4C'];

  const CategoryBreakdown: React.FC<{ categories: Record<string, number>; total: number }> = ({ categories, total }) => {
    const sortedCategories = Object.entries(categories)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    if (sortedCategories.length === 0) {
      return <p className="text-gray-500 text-sm">No expenses in this period</p>;
    }

    return (
      <div className="space-y-3">
        {sortedCategories.map(([category, amount], index) => {
          const percentage = total > 0 ? (amount / total) * 100 : 0;
          return (
            <div key={category} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="flex items-center flex-1">
                <div 
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm text-gray-700 capitalize w-24 truncate font-medium">
                  {category}
                </span>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: COLORS[index % COLORS.length]
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-800">
                  {formatCurrency(amount)}
                </span>
                <div className="text-xs text-gray-500">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{label}</p>
          <p className="text-purple-600">
            Amount: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header with Download Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Expense Analytics</h2>
          <p className="text-gray-600">Track your spending patterns and trends</p>
        </div>
        <button
          onClick={handleDownloadPDF}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Download PDF Report
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
            activeTab === 'weekly'
              ? 'bg-white text-green-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Calendar className="w-4 h-4 mr-2" />
          Weekly
        </button>
        <button
          onClick={() => setActiveTab('monthly')}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 text-sm font-medium ${
            activeTab === 'monthly'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Monthly
        </button>
      </div>

      {/* Chart Type Selector */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setChartType('pie')}
          className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 text-sm ${
            chartType === 'pie' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <PieChart className="w-4 h-4 mr-1" />
          Pie
        </button>
        <button
          onClick={() => setChartType('bar')}
          className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 text-sm ${
            chartType === 'bar' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BarChart3 className="w-4 h-4 mr-1" />
          Bar
        </button>
        <button
          onClick={() => setChartType('trend')}
          className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 text-sm ${
            chartType === 'trend' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <LineChart className="w-4 h-4 mr-1" />
          Trend
        </button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Summary Cards */}
        <div className="xl:col-span-1 space-y-4">
          {/* Current Period Summary */}
          <div className={`bg-gradient-to-br ${activeTab === 'weekly' ? 'from-green-50 to-emerald-100' : 'from-purple-50 to-indigo-100'} rounded-2xl p-6 shadow-lg border border-white/20`}>
            <h3 className={`text-lg font-semibold mb-4 flex items-center ${activeTab === 'weekly' ? 'text-green-700' : 'text-purple-700'}`}>
              {activeTab === 'weekly' ? (
                <>
                  <Calendar className="w-5 h-5 mr-2 text-green-500" />
                  This Week
                </>
              ) : (
                <>
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-500" />
                  This Month
                </>
              )}
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-sm text-gray-600">Total Spent</span>
                <span className={`text-xl font-bold ${activeTab === 'weekly' ? 'text-green-600' : 'text-purple-600'}`}>
                  {formatCurrency(activeTab === 'weekly' ? breakdown.weekly.total : breakdown.monthly.total)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-sm text-gray-600">Transactions</span>
                <span className="text-lg font-semibold text-gray-800">
                  {activeTab === 'weekly' ? breakdown.weekly.count : breakdown.monthly.count}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                <span className="text-sm text-gray-600">Avg per Transaction</span>
                <span className="text-lg font-semibold text-gray-800">
                  {formatCurrency(
                    (activeTab === 'weekly' ? breakdown.weekly.total : breakdown.monthly.total) / 
                    Math.max(1, activeTab === 'weekly' ? breakdown.weekly.count : breakdown.monthly.count)
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Category Breakdown</h4>
            <CategoryBreakdown 
              categories={currentCategories} 
              total={currentTotal} 
            />
          </div>
        </div>

        {/* Charts */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 h-full">
            <div className="h-80">
              {chartType === 'pie' && pieChartData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </RechartsPieChart>
                </ResponsiveContainer>
              )}

              {chartType === 'bar' && barChartData.length > 0 && (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="amount" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}

              {chartType === 'trend' && (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={breakdown.trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tickFormatter={(value) => `$${value}`} tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8B5CF6" 
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#8B5CF6', strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};