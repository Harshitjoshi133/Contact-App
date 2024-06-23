import React from 'react'

const NavigationBar = () => {
  return (
    <div className="flex justify-center items-center my-4 gap-2 bg-white h-[60px] text-xl rounded-lg font-medium">
      <img src="/logos_firebase.svg" alt="Firebase Logo"/> {/* Firebase logo */}
      <h1>FireBase Contact App</h1> {/* App title */}
    </div>
  )
}

export default NavigationBar
