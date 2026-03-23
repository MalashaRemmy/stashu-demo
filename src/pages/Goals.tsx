import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useTransactions } from '../hooks/useTransactions';
import { useGoals, Goal } from '../hooks/useGoals';

export default function Goals() {
  const { totalIncome, totalExpenses } = useTransactions();
  const { 
    goals, 
    addGoal, 
    deleteGoal, 
    addMoneyToGoal, 
    toggleGoalStatus,
    totalSaved,
    completedGoals,
    activeGoals
  } = useGoals();

  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetAmount: '',
    deadline: '',
    category: 'other' as Goal['category'],
    priority: 'medium' as Goal['priority']
  });

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!newGoal.title.trim()) {
      alert('Please enter a goal title');
      return;
    }
    
    if (!newGoal.targetAmount || parseFloat(newGoal.targetAmount) <= 0) {
      alert('Please enter a valid target amount');
      return;
    }
    
    if (!newGoal.deadline) {
      alert('Please select a deadline');
      return;
    }
    
    if (new Date(newGoal.deadline) < new Date()) {
      alert('Deadline must be in the future');
      return;
    }
    
    try {
      addGoal({
        title: newGoal.title.trim(),
        description: newGoal.description.trim(),
        targetAmount: parseFloat(newGoal.targetAmount),
        deadline: newGoal.deadline,
        category: newGoal.category,
        priority: newGoal.priority
      });
      
      setNewGoal({
        title: '',
        description: '',
        targetAmount: '',
        deadline: '',
        category: 'other',
        priority: 'medium'
      });
      setShowForm(false);
      
      // Success feedback
      alert('Goal created successfully! 🎯');
    } catch (error) {
      console.error('Error creating goal:', error);
      alert('Failed to create goal. Please try again.');
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getCategoryColor = (category: Goal['category']) => {
    const colors = {
      emergency: 'bg-red-100 text-red-600',
      education: 'bg-blue-100 text-blue-600',
      travel: 'bg-green-100 text-green-600',
      gadgets: 'bg-purple-100 text-purple-600',
      other: 'bg-gray-100 text-gray-600'
    };
    return colors[category];
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    const colors = {
      low: 'bg-green-100 text-green-600',
      medium: 'bg-yellow-100 text-yellow-600',
      high: 'bg-red-100 text-red-600'
    };
    return colors[priority];
  };

  const monthlySavings = (totalIncome - totalExpenses) / 12;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Financial Goals</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          + Add Goal
        </button>
      </div>

      {/* Goals Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${totalSaved.toLocaleString()}</div>
            <p className="text-sm text-gray-600">Across all goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">${monthlySavings.toFixed(0)}</div>
            <p className="text-sm text-gray-600">Available for goals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {completedGoals}/{goals.length}
            </div>
            <p className="text-sm text-gray-600">Goals achieved</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount</label>
                  <input
                    type="number"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({...newGoal, category: e.target.value as Goal['category']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="emergency">Emergency Fund</option>
                    <option value="education">Education</option>
                    <option value="travel">Travel</option>
                    <option value="gadgets">Gadgets</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({...newGoal, priority: e.target.value as Goal['priority']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Goal
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Card key={goal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{goal.title}</CardTitle>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(goal.category)}`}>
                  {goal.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{getProgressPercentage(goal.currentAmount, goal.targetAmount).toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${getProgressPercentage(goal.currentAmount, goal.targetAmount)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span>${goal.currentAmount.toLocaleString()}</span>
                <span className="text-gray-500">of ${goal.targetAmount.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                  {goal.priority} priority
                </span>
                <span className="text-xs text-gray-500">
                  Due: {new Date(goal.deadline).toLocaleDateString()}
                </span>
              </div>

              {goal.status === 'active' && (
                <div className="space-y-2">
                  <button 
                    onClick={() => {
                      const amount = prompt('How much would you like to add to this goal?');
                      if (amount && !isNaN(parseFloat(amount))) {
                        addMoneyToGoal(goal.id, parseFloat(amount));
                      }
                    }}
                    className="w-full px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                  >
                    Add Money
                  </button>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleGoalStatus(goal.id)}
                      className="flex-1 px-2 py-1 bg-yellow-600 text-white rounded text-xs hover:bg-yellow-700 transition-colors"
                    >
                      {goal.status === 'active' ? 'Pause' : 'Resume'}
                    </button>
                    <button 
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this goal?')) {
                          deleteGoal(goal.id);
                        }
                      }}
                      className="flex-1 px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}