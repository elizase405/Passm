import React from 'react'

const AuthBorder = () => {
  return (
    // <div className='flex justify-center items-center w-full h-full'>
        // <div className='flex justify-center items-center relative border-2 border-blue-300/70 w-3/4 h-3/4'>
        <div>
          {/* Borders */}
          <div>
            {/* Top left width and bottom left height */}
            <div>
              <span className='topleft1'></span>
              <span className='topleft2'></span>
              <span className='bottomleft1'></span>
              <span className='bottomleft2'></span>
            </div>
            {/* Top right width and bottom right height */}
            <div>
              <span className='topright1'></span>
              <span className='topright2'></span>
              <span className='bottomright1'></span>
              <span className='bottomright2'></span></div>
            {/* Polygon */}
            <div>
              <span className='polygon'></span>
              <div>
                <span className='leftclip h-2/6 left-0'></span>
                <span className='leftclip h-1/6 left-2 '></span>
              </div>
              <div>
                <span className='rightclip h-2/6 right-0'></span>
                <span className='rightclip h-1/6 right-2'></span>
              </div>
            </div>
          </div>
        </div>
        // </div>
    // </div>
  )
}

export default AuthBorder