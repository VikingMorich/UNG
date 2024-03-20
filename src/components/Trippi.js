import React from 'react';
import { useTranslation } from "react-i18next"


export default function Trippi() {
    const [t, i18n] = useTranslation("global")

    return (
        <React.Fragment>
          <div className='trippi-wrapper'>
            <div className='infinite-rotate' style={{ backgroundColor: 'black'}}>
              <div className='infinite-rotate' style={{ backgroundColor: 'white'}}>
                <div className='infinite-rotate' style={{ backgroundColor: 'black'}}>
                  <div className='infinite-rotate' style={{ backgroundColor: 'white'}}>
                    <div className='infinite-rotate' style={{ backgroundColor: 'black'}}>
                      <div className='infinite-rotate' style={{ backgroundColor: 'white'}}>
                        <div className='infinite-rotate' style={{ backgroundColor: 'black'}}>
                          <div className='infinite-rotate' style={{ backgroundColor: 'white'}}>
                            <div className='infinite-rotate' style={{ backgroundColor: 'black'}}>
                              <div className='infinite-rotate' style={{ backgroundColor: 'white'}}>
                                <div className='infinite-rotate' style={{ backgroundColor: 'black'}}>
                                  <div className='infinite-rotate' style={{ backgroundColor: 'white'}}>
                                    <div className='infinite-rotate' style={{ backgroundColor: 'black'}}>
                                      <div className='infinite-rotate' style={{ backgroundColor: 'white'}}>
                                        <div className='infinite-rotate' style={{ backgroundColor: 'black'}}>
                                          <div className='infinite-rotate' style={{ backgroundColor: 'white'}}>

                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
    );
}