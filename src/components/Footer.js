import React from 'react'

const Footer = () => {
    return (
      <footer>
        <div className="container-fluid">
          <div className='row text-center py-3 bg-primary text-white'>
            <div className='col d-flex flex-column justify-content-center align-items-center'>
              <p>For More Information</p>
              <p>
                <i className='fas fa-address-card fa-2x'>
                  {' '}
                  <span className='px-2'>Rajshai</span>{' '}
                </i>
              </p>
              <p>
                <i className='fas fa-mobile fa-2x'>
                  {' '}
                  <span className='px-2'>+01521421212</span>{' '}
                </i>
              </p>
            </div>

            <div  className='col d-flex justify-content-center align-items-center'>
              <i className='fab fa-facebook fa-2x px-3'></i>
              <i className='fab fa-google-plus fa-2x px-3'></i>
              <i className='fab fa-twitter fa-2x px-3'></i>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className='row'>
            <div className='col text-center py-3 bg-dark text-white'>
              Copyright &copy; DroneWorld
            </div>
          </div>
        </div>
      </footer>
    )
}

export default Footer
