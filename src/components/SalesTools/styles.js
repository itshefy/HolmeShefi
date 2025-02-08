// src/components/SalesTools/styles.js
export const cardStyles = {
  wrapper: "bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300",
  header: "text-2xl font-bold mb-4 text-gray-800",
  subheader: "text-lg text-gray-600 mb-6",
  contentSection: "space-y-4"
};

export const buttonStyles = {
  primary: "bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-md",
  secondary: "bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200 transition-all",
  outline: "border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all"
};

export const inputStyles = {
  base: "w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none",
  label: "block text-gray-700 font-medium mb-2",
  error: "text-red-500 text-sm mt-1"
};

export const selectStyles = {
  wrapper: "relative",
  select: "w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none appearance-none",
  icon: "absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
};