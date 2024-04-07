import React, { useState, useEffect, useRef, useMemo } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

function App(props) {
  const [news, setNews] = useState(null);
  const [weather, setWeather] = useState(null);
  const [stocks, setStocks] = useState(null);
  const newsRef = useRef(null);
  const stockRef = useRef(null);
  const weatherRef = useRef(null);
  const [name, setName] = useState(() => Cookies.get('name') || "");
  const [showConsent, setShowConsent] = useState(() => !Cookies.get('cookieConsent'));
  const [isHovering, setIsHovering] = useState(false);
  const [showLimitMessage, setShowLimitMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const validArticleData = news ? getNextValidArticleData(news.articles, 0) : null;
  
  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/stocks');
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks data:', error.message);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const executeSearch = () => {
    if (searchQuery) {
      const url = `https://www.marketwatch.com/investing/stock/${encodeURIComponent(searchQuery)}?mod=search_symbol`;
      window.open(url, '_blank');
      setSearchQuery(''); 
    }
  };
  
  const handleSearchEnter = (e) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
  };
  useEffect(() => {
    if (!Cookies.get('name') && !Cookies.get('cookieConsent')) {
      const userName = prompt("Please enter your name:", "");
      if (userName) {
        setName(userName);
        //wait for yes or no 
      }
    }
  }, []);

 
  const scrollToNews = () => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToStocks = () => {
    if (stockRef.current) {
      stockRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToWeather = () => {
    if (weatherRef.current) {
      weatherRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/weather');
        setWeather(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
      }
    };

    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news data:', error.message);
      }
    };

    fetchWeather();
    fetchNews();
    fetchStocks();
  }, []);

  function getNextValidArticleData(articles, startingIndex) {
    let currentIndex = startingIndex;
  
    while (currentIndex < articles.length) {
      if (articles[currentIndex].urlToImage && articles[currentIndex].description) {
        return {
          title: articles[currentIndex].title,
          description: articles[currentIndex].description,
          imageUrl: articles[currentIndex].urlToImage,
          url: articles[currentIndex].url,
        };
      }
      currentIndex++;
    }
  
    return null; 
  }
  
  
  const { articleData3, articleData8, articleData10, articleData6 } = React.useMemo(() => {
    if (news && news.articles) {
      const data3 = getNextValidArticleData(news.articles, 3);
      const data8 = getNextValidArticleData(news.articles, 8);
      const data10 = getNextValidArticleData(news.articles, 10);
      const data6 = getNextValidArticleData(news.articles, 6);
      
      console.log(data3.imageUrl); 
  
      return {
        articleData3: data3,
        articleData8: data8,
        articleData10: data10,
        articleData6: data6,
      };
    }
    return { articleData3: null, articleData8: null, articleData10: null, articleData6: null };
  }, [news]);
 

  const handleNameChange = () => {
    const newName = prompt("Enter your new name:", name);
    if (newName && newName !== name) {
      setName(newName);
      if (Cookies.get('cookieConsent') === "yes") {
        Cookies.set('name', newName, { expires: 7 });
      }
    }
  };
  const handleConsent = (consent) => {
    setShowConsent(false);
    Cookies.set('cookieConsent', consent, { expires: 365 });
    if (consent === "yes") {
      Cookies.set('name', name, { expires: 7 });
    }
  };

  const handleRefreshStocks = () => {
    const limitReached = true; 
    if (limitReached) {
      setShowLimitMessage(true);
     
      setTimeout(() => setShowLimitMessage(false), 5000); 
    } else {
      fetchStocks();
    }
  };

  function kelvinToCelsius(kelvin) {
    return (kelvin - 273.15).toFixed(2);
  }

  function formatSunsetTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/New_York' 
    };
    let timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

    timeString = timeString.charAt(0) === '0' ? timeString.substring(1) : timeString;
  
    return (
      <>
        <span>{timeString}</span>
        <br />
        <span>EST</span> {}
      </>
    );
  }
  return (
    <>
      {showConsent && (
        <div className="consent-banner">
          &#x1F44B; Hi! Just wanted to let you know that we use cookies on our site. These cookies enhance your experience, improve the quality of our site, and help us show you things that are more likely to be relevant to you. By clicking "Accept", you're agreeing to the placement and use of cookies. That is all. Thanks for reading!
          <div style={{ marginTop: "10px" }}>
            <button className="button-style" onClick={() => handleConsent("yes")}>Yes</button>
            <button className="button-style" onClick={() => handleConsent("no")}>No</button>
          </div>
        </div>
      )}
      <div className="div">
        <div className="div-2">
          <div 
            className="div-3"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={handleNameChange}
          >
            Welcome {name}{isHovering && <span style={{ marginRight: '5px' }}> &#x1F589;</span>}
          </div>
        <div className="div-4">
          <div className="div-5" onClick={scrollToWeather}>Weather</div>
          <div className="div-6" onClick={scrollToStocks}>Stocks</div>
          <div className="div-7" onClick={scrollToNews}>News</div>
        </div>
        </div>
        <div className="div-9" ref={weatherRef}>
          <div className="div-10">
            <div className="column">
              <div className="div-11">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&"
                  className="img"
                />
                <div className="div-12">
                  <div className="div-13">
                  {weather && (
                      <div className="div-22">
                        {kelvinToCelsius(weather.main.temp)}
                      </div>
                    )}
                    </div>
                  <div className="div-14">
                    <span style={{fontSize: '28px'}}>° C</span>{" "}
                  </div>
                </div>
                <div className="div-15">
                {weather && (
                  <div>
                    {weather.name}, {weather.sys.country}
                    <span style={{ fontSize: '26px' }}></span> {}
                  </div>
                )}
              </div>
              </div>
            </div>
            <div className="column-2">
              <div className="div-16">
                <div className="div-17">
                  <div className="div-18">
                    <div className="column">
                      <div className="div-19">
                        <div className="div-20">Feels Like</div>
                        <div className="div-21">
                          {weather && (
                            <div className="div-22">
                              {(weather.main.feels_like - 273.15).toFixed(2)}
                              <span style={{ fontSize: '28px' }}></span>
                            </div>
                          )}

                          <div className="div-23">
                            <span style={{fontSize: '28px'}}>° c</span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column-3">
                      <div className="div-24">
                        <div className="div-25">Sunrise</div>
                        <div className="div-26">                          
                        {weather && (
                              <div className="div-22-sunrise">
                                {formatSunsetTime(weather.sys.sunrise)}
                              <span style={{}}></span>
                              </div>
                            )}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div-27">
                  <div className="div-28">
                    <div className="column-4">
                      <div className="div-29">
                        <div className="div-30">Humidity</div>
                        <div className="div-31">
                        {weather && (
                              <div className="div-22">
                                {weather.main.humidity}
                                <span style={{ fontSize: '100px' }}>%</span>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="column-5">
                      <div className="div-32">
                      <div className="div-33">Sunset</div>
                        <div className="div-34">
                          {weather && (
                            <div className="div-22-sunset">
                              {formatSunsetTime(weather.sys.sunset)}
                              <span style={{}}></span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-40" ref={stockRef}>
            <div className="div-41">
            <img
              src="/search.png"
              className="div-42"
              alt="Search"
              onClick={executeSearch} 
            />
            <input
                className="div-43"
                placeholder="Search Stocks"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchEnter} 
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f9c373d0804712ab5f64a26887c68fe207244ccbb93b4f4ebe06cdeca2acb4d?apiKey=bfadb715bc704462b9199ff254b319bd&"
                className="img-2"
                onClick={clearSearch}
              />
            </div>
          </div>
          <div className="div-44">
          <div className="div-45">
            <div className="column-7">
              <div className="div-46">
              <div className="div-47">
                {stocks && stocks.length > 0 && (
                      <div>
                        {stocks[0].ticker} (Apple)
                        <br />
                      </div>
                )}
              </div>
              {stocks && stocks.length > 0 && (
                <div>
                   <div className="div-48">Volume: {stocks[0].results[0].v}</div>
                  <div className="div-49">VWAP: {stocks[0].results[0].vw}</div>
                  <div className="div-50">Open: {stocks[0].results[0].o}</div>
                  <div className="div-51">Close: {stocks[0].results[0].c}</div>
                  <div className="div-52">High: {stocks[0].results[0].h}</div>
                  <div className="div-53">Low: {stocks[0].results[0].l}</div>
                </div>
              )}
              </div>
            </div>
            <div className="column-8">
              <div className="div-54">
                <div className="div-55">
                  {stocks && stocks.length > 0 && (
                    <div>
                      {stocks[1].ticker} (Microsoft)
                      <br />
                    </div>
                  )}
              </div>
              {stocks && stocks.length > 0 && (
                <div>
                  <div className="div-48">Volume: {stocks[1].results[0].v}</div>
                  <div className="div-49">VWAP: {stocks[1].results[0].vw}</div>
                  <div className="div-50">Open: {stocks[1].results[0].o}</div>
                  <div className="div-51">Close: {stocks[1].results[0].c}</div>
                  <div className="div-52">High: {stocks[1].results[0].h}</div>
                  <div className="div-53">Low: {stocks[1].results[0].l}</div>
                </div>
              )}
              </div>
            </div>
            <div className="column-9">
              <div className="div-62">
                <div className="div-63">
                  {stocks && stocks.length > 0 && (
                    <div>
                      {stocks[2].ticker} (Google)
                      <br />
                    </div>
                  )}
                 </div>
                  {stocks && stocks.length > 0 && (
                    <div>
                      <div className="div-48">Volume: {stocks[2].results[0].v}</div>
                      <div className="div-49">VWAP: {stocks[2].results[0].vw}</div>
                      <div className="div-50">Open: {stocks[2].results[0].o}</div>
                      <div className="div-51">Close: {stocks[2].results[0].c}</div>
                      <div className="div-52">High: {stocks[2].results[0].h}</div>
                      <div className="div-53">Low: {stocks[2].results[0].l}</div>
                    </div>
                  )}
                  </div>
                </div>
            <div className="column-10">
              <div className="div-70">
                <div className="div-71">
                  {stocks && stocks.length > 0 && (
                    <div>
                      {stocks[3].ticker} (Amazon)
                      <br />
                    </div>
                  )}
                 </div>
                  {stocks && stocks.length > 0 && (
                    <div>
                      <div className="div-48">Volume: {stocks[3].results[0].v}</div>
                      <div className="div-49">VWAP: {stocks[3].results[0].vw}</div>
                      <div className="div-50">Open: {stocks[3].results[0].o}</div>
                      <div className="div-51">Close: {stocks[3].results[0].c}</div>
                      <div className="div-52">High: {stocks[3].results[0].h}</div>
                      <div className="div-53">Low: {stocks[3].results[0].l}</div>
                    </div>
                  )}
                  </div>
                </div>
          </div>
        </div>
        {showLimitMessage && (
          <div style={{ textAlign: 'center', color: 'red', marginBottom: '-10px', marginTop:"10px", fontSize: "35px", font: "35px Outfit, sans-serif" }}>
            Reached maximum calls per hour on free tier.
          </div>
        )}
         <div className="div-102" onClick={handleRefreshStocks}>Refresh Stocks</div>
        <div className="div-78">
          <div className="div-79">
            <div className="column">
              <div className="div-80">
              <div className="div-81">
              {news && news.articles && news.articles.length > 0 && (
                <div className="div-81-title">
                  {articleData3.title}
                </div>
              )}
              </div>
                <div className="div-82">
                <div className="div-83">
                  {news && news.articles && news.articles.length > 0 && (
                    <div className="div-81-description">
                      {articleData3.description} 
                    </div>
                  )}
                  <div className="div-83-image">
                    {news && news.articles && news.articles.length > 0 && (
                      <img src={articleData3.imageUrl} alt="Article" />
                    )}
                  </div>
                </div>
                <div className="div-84">
                  {news && news.articles && news.articles.length > 0 && (
                    <a href={articleData3.url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  )}
                </div>

                </div>
              </div>
            </div>
            <div className="column-11" ref={newsRef}>
                <div className="div-85">
                  <div className="div-87">
                    <div className="div-88">
                      {news && news.articles && news.articles.length > 0 && (
                        <div className="div-88-title">
                          {articleData8.title} 
                        </div>
                      )}
                      <br />
                    </div>
                    <div className="div-86">
                      {news && news.articles && news.articles.length > 0 && (
                        <div className="div-86-description">
                          {articleData8.description} 
                        </div>
                      )}
                      <div className="div-86-image">
                        {news && news.articles && news.articles.length > 0 && (
                          <img src={articleData8.imageUrl} alt="Article" />
                        )}
                      </div>
                    </div>
                    <div className="div-89">
                      {news && news.articles && news.articles.length > 0 && (
                        <a href={articleData8.url} target="_blank" rel="noopener noreferrer">
                          Read More
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="div-90">
            <div className="div-91">
              <div className="column-12">
                <div className="div-92">
                  <div className="div-93">
                    {news && news.articles && news.articles.length > 0 && (
                      <div className="div-93-title">
                        {articleData10.title} 
                      </div>
                    )}
                    <br />
                  </div>
                  <div className="div-94">
                    <div className="div-95">
                      {news && news.articles && news.articles.length > 0 && (
                        <div className="div-95-description">
                          {articleData10.description} 
                        </div>
                      )}
                      <div className="div-95-image">
                        {news && news.articles && news.articles.length > 0 && (
                          <img src={articleData10.imageUrl} alt="Article" />
                        )}
                      </div>
                    </div>
                    <div className="div-96">
                      {news && news.articles && news.articles.length > 0 && (
                        <a href={articleData10.url} target="_blank" rel="noopener noreferrer">
                          Read More
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            <div className="column-13">
              <div className="div-97">
                <div className="div-98">
                    {news && news.articles && news.articles.length > 0 && (
                    <div className="div-98-title">
                      {articleData6.title} 
                    </div>
                  )}
                  <br />
                </div>
                <div className="div-99">
                  <div className="div-100">
                  {news && news.articles && news.articles.length > 0 && (
                    <div className="div-100-description">
                      {articleData6.description} 
                    </div>
                  )}
                  <div className="div-100-image">
                    {news && news.articles && news.articles.length > 0 && (
                      <img src={articleData6.imageUrl} alt="Article" />
                    )}
                  </div>
                  </div>
                  <div className="div-101">
                  {news && news.articles && news.articles.length > 0 && (
                    <a href={articleData6.url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-102">Load more</div>
        <div className="div-103">
          <footer className="footer">
            <div className="footer-top">
              <div className="footer-section about">
                <h2>About Us</h2>
                <p>Small team of 3 devs put this site together for lambton collage. Check out the github for more.</p>
              </div>
              <div className="footer-section developers">
                <h2>Developers</h2>
                <ul>
                  <li><a href="https://github.com/k-o-r-o" target="_blank" rel="noopener noreferrer"> Drake (koro)</a></li>
                  <li><a href="https://github.com/GreyHatTech" target="_blank" rel="noopener noreferrer">Zac (GreyHatTech)</a></li>
                  <li><a href="https://github.com/k-o-r-o" target="_blank" rel="noopener noreferrer">Maheswari</a></li>
                </ul>
              </div>
              <div className="footer-section contact">
                <h2>Contact Us</h2>
                <p>Email us at: <a href="mailto:drakelandon9@gmail.com">GreyHatTech@outlook.com</a></p>
              </div>
            </div>
            <div className="footer-bottom">
              &copy; {new Date().getFullYear()} | Designed by Drake, Zac, Mahi
            </div>
          </footer>
        </div>
      </div>
      <style jsx>{`
        .consent-banner {
          position: fixed;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(31, 29, 71, 0.97);
          padding: 50px;
          text-align: center;
          width: 50%;
          font-size: 30px;
          font-family: Outfit, sans-serif;
          color: white;
          border: 5px solid #50529b;
          z-index: 1000; 
        }


        .button-style {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            180deg,
            rgba(96, 50, 153, 0.31) 0%,
            rgba(96, 50, 153, 0) 100%
          );
          color: #fff;
          padding: 15px 80px; 
          margin: 5px;
          font: 400 25px/1.6 Outfit, -apple-system, Roboto, Helvetica, sans-serif;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s, border-color 0.3s;
        }
        
        .button-style:hover {
          background-color: rgba(96, 50, 153, 0.8);
          border-color: rgba(96, 50, 153, 0.8);
        }

        .div {
          background: linear-gradient(156deg, #252746 3.32%, #412a82 96.42%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .div-2 {
          border: 2px solid #50529b;
          background-color: rgba(31, 29, 71, 0.5);
          align-self: stretch;
          display: flex;
          width: 96.59%;
          align-items: start;
          justify-content: space-between;
          gap: 20px;
          font-size: 32px;
          color: #eee;
          font-weight: 400;
          text-align: center;
          line-height: 86%;
          padding: 16px 30px 25px;
          justify-content: space-around;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
            padding: 0 20px;
          }
        }
        .div-3 {
          margin-top: 24px;
          font: 600 64px/43% Outfit, -apple-system, Roboto, Helvetica, sans-serif;
          margin-right: auto;
          margin-left: 0; 
          padding-left: 270px;
        }
        
        @media (max-width: 991px) {
          .div-3 {
            max-width: 100%;
            font-size: 40px;
          }
        }
        .div-4 {
          align-self: end;
          display: flex;
          margin-top: 37px;
          justify-content: space-between;
          gap: 20px;
          white-space: nowrap;
          margin-left: auto; 
          padding-right: 0px;
          margin-right: -150px;
        }
        
        @media (max-width: 991px) {
          .div-4 {
            max-width: 100%;
            flex-wrap: wrap;
            white-space: initial;
          }
        }
        .div-5 {
          font-family: Outfit, sans-serif;
          flex-grow: 1;
          margin-left: auto;
          background-color: initial;
          transition: background-color 0.3s ease; 
        }
        .div-6 {
          font-family: Outfit, sans-serif;
          flex-grow: 1;
          flex-basis: auto;
          margin-left: auto;
          background-color: initial;
          transition: background-color 0.3s ease; 
        }
        .div-7 {
          font-family: Outfit, sans-serif;
          flex-grow: 1;
          margin-right: 410px;
          margin-left: auto;
          background-color: initial;
          transition: background-color 0.3s ease; 
        }

        .div-5:hover:after, .div-6:hover:after, .div-7:hover:after {
          content: '˅'; 
          font-size: 30px; 
          margin-left: 8px; 
        }
        
        .div-3:hover, .div-5:hover, .div-6:hover, .div-7:hover {
          color: #A8A8A8; 
          transition:  0.3s ease;
        }
        .div-9 {
          margin-top: 28px;
          width: 100%;
          max-width: 1309px;
        }
        @media (max-width: 991px) {
          .div-9 {
            max-width: 100%;
          }
        }
        .div-10 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-10 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 33%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column {
            width: 100%;
          }
        }
        .div-11 {
          border-radius: 13.5px;
          border: 2px solid #4e509a;
          background: linear-gradient(
            180deg,
            #211f48 0%,
            rgba(31, 29, 71, 0) 100%
          );
          box-shadow: -5px -5px 250px 0px rgba(255, 255, 255, 0.02) inset;
          backdrop-filter: blur(21px);
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #eee;
          font-weight: 400;
          line-height: 120%;
          width: 100%;
          padding: 2px 6px 190px;
        }
        @media (max-width: 991px) {
          .div-11 {
            max-width: 100%;
            margin-top: 14px;
            padding: 0 20px;
          }
        }
        .img {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 192px;
          z-index: 10;
          max-width: 100%;
        }
        .div-12 {
          display: flex;
          margin-top: -17px;
          gap: 0px;
          white-space: nowrap;
        }
        @media (max-width: 991px) {
          .div-12 {
            white-space: initial;
          }
        }
        .div-13 {
          text-align: center;
          letter-spacing: -5px;
          flex-grow: 1;
          font: 100px Outfit, sans-serif;
        }
        @media (max-width: 991px) {
          .div-13 {
            font-size: 40px;
          }
        }
        .div-14 {
          letter-spacing: -1.2px;
          align-self: start;
          font: 24px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .div-14 {
            white-space: initial;
          }
        }
        .div-15 {
          text-align: center;
          letter-spacing: 1.2px;
          align-self: stretch;
          margin-top: 33px;
          font: 40px Outfit, sans-serif;
        }
        .column-2 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 67%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-2 {
            width: 100%;
          }
        }
        .div-16 {
          display: flex;
          flex-grow: 1;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-16 {
            max-width: 100%;
            margin-top: 16px;
          }
        }
        .div-17 {
        }
        @media (max-width: 991px) {
          .div-17 {
            max-width: 100%;
          }
        }
        .div-18 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-18 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .div-19 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            180deg,
            #211f48 0%,
            rgba(33, 31, 72, 0) 100%
          );
          display: flex;
          width: 100%;
          flex-direction: column;
          color: #eee;
          font-weight: 400;
          line-height: 120%;
          margin: 0 auto;
          padding: 23px 4px;
          padding-bottom: 65px;
          
        }
        @media (max-width: 991px) {
          .div-19 {
            margin-top: 15px;
            padding: 0 20px;
          }
        }
        .div-20 {
          text-align: center;
          letter-spacing: 1.05px;
          white-space: nowrap;
          font: 35px Outfit, sans-serif;
        }
        @media (max-width: 991px) {
          .div-20 {
            white-space: initial;
          }
        }
        .div-21 {
          display: flex;
          margin-top: 15px;
          justify-content: space-between;
          gap: 0px;
        }
        .div-22 {
          text-align: center;
          letter-spacing: -5px;
          flex-grow: 1;
          font: 100px Outfit, sans-serif;
          
        }
        .div-22-sunset {
          text-align: center;
          margin-left: 150px;
          margin-top: -10px;
          font: 63px Outfit, sans-serif;
          
        }

        .div-22-sunrise {
          text-align: center;
          margin-left: 15px;
          margin-top: -30px;
          font: 63px Outfit, sans-serif;
        }
        @media (max-width: 991px) {
          .div-22 {
            font-size: 40px;
          }
        }
        .div-23 {
          letter-spacing: -1.2px;
          align-self: start;
          font: 24px Inter, sans-serif;
          margin-right: 10px;
          margin-left:-15px;
        }
        .column-3 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 67%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-3 {
            width: 100%;
          }
        }
        .div-24 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            180deg,
            #211f48 0%,
            rgba(33, 31, 72, 0) 100%
          );
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-weight: 400;
          white-space: nowrap;
          text-align: center;
          line-height: 120%;
          width: 100%;
          padding-top: 25px;
          padding-right: 20px;
          padding-bottom: 25px;
          padding-left: 8px;
          margin-left: -10px;

        }
        @media (max-width: 991px) {
          .div-24 {
            max-width: 100%;
            margin-top: 15px;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-25 {
          color: #eee;
          letter-spacing: 1.05px;
          font: 35px Outfit, sans-serif;
        }
        @media (max-width: 991px) {
          .div-25 {
            max-width: 100%;
            margin-right: 9px;
          }
        }
        .div-26 {
          color: #fff;
          letter-spacing: 3px;
          align-self: center;
          margin-top: 53px;
          marging-left: 400px;
          font: 50px Outfit, sans-serif;
        }
        @media (max-width: 991px) {
          .div-26 {
            font-size: 40px;
            margin: 40px 9px 0 0;
          }
        }
        .div-27 {
          margin-top: 7px;
          padding: 0 20px;
        }
        @media (max-width: 991px) {
          .div-27 {
            max-width: 100%;
          }
        }
        .div-28 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-28 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column-4 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 25%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column-4 {
            width: 100%;
          }
        }
        .div-29 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            180deg,
            #211f48 0%,
            rgba(33, 31, 72, 0) 100%
          );
          display: flex;
          width: 100%;
          flex-direction: column;
          color: #eee;
          font-weight: 400;
          line-height: 120%;
          margin: 0 auto;
          padding: 35px 1px;
          padding-bottom: 65px;
          margin-left: -20px;
          padding-right: 75px;
        }
        @media (max-width: 991px) {
          .div-29 {
            margin-top: 16px;
            white-space: initial;
          }
        }
        .div-30 {
          letter-spacing: 1.05px;
          font: 35px Outfit, sans-serif;
          text-align: center; 
          margin-left: 65px;
          margin-top: -10px;
        }
        .div-31 {
          letter-spacing: 3px;
          margin-top: 39px;
          font: 100px Outfit, sans-serif;
          margin-left: 50px;
        }
        @media (max-width: 991px) {
          .div-31 {
            font-size: 40px;
          }
        }
        .column-5 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 51%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-5 {
            width: 100%;
          }
        }
        .div-32 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            180deg,
            #211f48 0%,
            rgba(33, 31, 72, 0) 100%
          );
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-weight: 400;
          white-space: nowrap;
          text-align: center;
          line-height: 120%;
          width: 100%;
          padding-top: 20px;
          padding-right: 150px;
          padding-bottom: 35px;
          padding-left: 17px;
          margin-left: 35px;
        }
        @media (max-width: 991px) {
          .div-32 {
            max-width: 100%;
            margin-top: 16px;
            white-space: initial;
            padding: 0 20px;
          }
        }
        .div-33 {
          color: #eee;
          letter-spacing: 1.05px;
          font: 35px Outfit, sans-serif;
          text-align: center;
          margin-left: 125px;
        }
        .div-34 {
          color: #fff;
          letter-spacing: 3px;
          align-self: center;
          margin-top: 48px;
          font: 50px Outfit, sans-serif;
        }
        @media (max-width: 991px) {
          .div-34 {
            margin-top: 40px;
            font-size: 40px;
          }
        }
        .column-6 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 25%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-6 {
            width: 100%;
          }
        }
        .div-35 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            180deg,
            #211f48 0%,
            rgba(33, 31, 72, 0) 100%
          );
          display: flex;
          width: 100%;
          flex-grow: 1;
          flex-direction: column;
          font-weight: 400;
          line-height: 120%;
          margin: 0 auto;
          padding: 19px 22px;
        }
        @media (max-width: 991px) {
          .div-35 {
            margin-top: 16px;
            padding-left: 20px;
          }
        }
        .div-36 {
          color: #fff;
          text-align: center;
          letter-spacing: 1.05px;
          font: 35px Outfit, sans-serif;
        }
        .div-37 {
          align-self: center;
          display: flex;
          margin-top: 20px;
          gap: 0px;
          color: #eee;
          white-space: nowrap;
        }
        @media (max-width: 991px) {
          .div-37 {
            white-space: initial;
          }
        }
        .div-38 {
          text-align: center;
          letter-spacing: -5px;
          flex-grow: 1;
          font: 100px Outfit, sans-serif;
        }
        @media (max-width: 991px) {
          .div-38 {
            font-size: 40px;
          }
        }
        .div-39 {
          letter-spacing: -1.2px;
          align-self: start;
          font: 24px Inter, sans-serif;
        }
        @media (max-width: 991px) {
          .div-39 {
            white-space: initial;
          }
        }
        .div-40 {
          border-radius: 13.5px;
          background-color: #5d6470;
          display: flex;
          margin-top: 21px;
          width: 100%;
          max-width: 1334px;
          margin-left: 24px;
          flex-direction: column;
          justify-content: center;
        }
        
        @media (max-width: 991px) {
          .div-40 {
            max-width: 100%;
          }
        }
        
        .div-41 {
          align-items: center;
          border-radius: 10px;
          background-color: #5d6470;
          display: flex;
          gap: 0px;
          padding: 12px 20px;
        }
        
        @media (max-width: 991px) {
          .div-41 {
            max-width: 100%;
            flex-wrap: wrap;
          }
        }
        
        .div-42 {
          width: 50px; 
          height: auto; /
        }
        
        @media (max-width: 991px) {
          .div-42 {
            white-space: initial;
          }
        }
        
        .div-43 {
          border: none; 
          background-color: transparent; 
          color: #eee; 
          padding: 12px 20px; 
          font: 400 30px/110% Outfit, -apple-system, Roboto, Helvetica, sans-serif;
          align-self: stretch; 
          flex-grow: 1; 
          margin: auto 0;
          border-radius: 20px; 
          margin-right: -40px;
          margin-left: 10px;
        }
        
        .div-43::placeholder {
          color: #ccc; 
        }
        
        .div-43:focus {
          outline: none; 
          background-color: #6e7681; 
        }
        @media (max-width: 991px) {
          .div-43 {
            max-width: 100%;
          }
        }
        .img-2 {
          aspect-ratio: 1;
          object-fit: auto;
          object-position: center;
          width: 30px;
          align-self: stretch;
          margin: auto 0;
        }
        .div-44 {
          margin-top: 17px;
          width: 100%;
          max-width: 1305px;
          padding: 0 20px;
        }
        @media (max-width: 991px) {
          .div-44 {
            max-width: 100%;
          }
        }
        .div-45 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-45 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column-7 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 23%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column-7 {
            width: 100%;
          }
        }
        .div-46 {
          border-radius: 14px;
          background-color: rgba(31, 29, 71, 1);
          border: 2px solid rgba(80, 82, 155, 1);
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 24px;
          color: #fff;
          font-weight: 400;
          width: 100%;
          padding: 27px 5px 50px 19px;
        }
        @media (max-width: 991px) {
          .div-46 {
            margin-top: 15px;
            padding-right: 20px;
          }
        }
        .div-47 {
          text-align: center;
          align-self: end;
          width: 315px;
          padding-left: 108px;
          font: 35px Outfit, sans-serif;
        }
        .div-48 {
          font-family: Outfit, sans-serif;
          margin-top: 55px;
        }
        @media (max-width: 991px) {
          .div-48 {
            margin-top: 40px;
          }
        }
        .div-49 {
          font-family: Outfit, sans-serif;
          margin-top: 32px;
        }
        .div-50 {
          font-family: Outfit, sans-serif;
          margin-top: 28px;
        }
        .div-51 {
          font-family: Outfit, sans-serif;
          margin-top: 23px;
        }
        .div-52 {
          font-family: Outfit, sans-serif;
          margin-top: 21px;
          color: #00FF00;
        }
        .div-53 {
          font-family: Outfit, sans-serif;
          margin-top: 20px;
          color: #ff0000;
        }
        .column-8 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 23%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-8 {
            width: 100%;
          }
        }
        .div-54 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background-color: rgba(31, 29, 71, 0.6);
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 24px;
          color: #fff;
          font-weight: 400;
          width: 100%;
          padding: 25px 5px 50px 17px;
        }
        @media (max-width: 991px) {
          .div-54 {
            margin-top: 15px;
            padding-right: 20px;
          }
        }
        .div-55 {
          text-align: center;
          align-self: end;
          width: 315px;
          padding-left: 101px;
          font: 35px Outfit, sans-serif;
        }
        .div-56 {
          font-family: Outfit, sans-serif;
          margin-top: 57px;
        }
        @media (max-width: 991px) {
          .div-56 {
            margin-top: 40px;
          }
        }
        .div-57 {
          font-family: Outfit, sans-serif;
          margin-top: 32px;
        }
        .div-58 {
          font-family: Outfit, sans-serif;
          margin-top: 28px;
        }
        .div-59 {
          font-family: Outfit, sans-serif;
          margin-top: 23px;
        }
        .div-60 {
          font-family: Outfit, sans-serif;
          margin-top: 21px;
        }
        .div-61 {
          font-family: Outfit, sans-serif;
          margin-top: 20px;
        }
        .column-9 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 23%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-9 {
            width: 100%;
          }
        }
        .div-62 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background-color: rgba(31, 29, 71, 0.4);
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 24px;
          color: #fff;
          font-weight: 400;
          width: 100%;
          padding: 25px 5px 50px 19px;
        }
        @media (max-width: 991px) {
          .div-62 {
            margin-top: 15px;
            padding-right: 20px;
          }
        }
        .div-63 {
          text-align: center;
          align-self: end;
          width: 315px;
          padding-left: 100px;
          font: 35px Outfit, sans-serif;
        }
        .div-64 {
          font-family: Outfit, sans-serif;
          margin-top: 57px;
        }
        @media (max-width: 991px) {
          .div-64 {
            margin-top: 40px;
          }
        }
        .div-65 {
          font-family: Outfit, sans-serif;
          margin-top: 32px;
        }
        .div-66 {
          font-family: Outfit, sans-serif;
          margin-top: 28px;
        }
        .div-67 {
          font-family: Outfit, sans-serif;
          margin-top: 23px;
        }
        .div-68 {
          font-family: Outfit, sans-serif;
          margin-top: 21px;
        }
        .div-69 {
          font-family: Outfit, sans-serif;
          margin-top: 20px;
        }
        .column-10 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 22%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-10 {
            width: 100%;
          }
        }
        .div-70 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background-color: rgba(31, 29, 71, 0.1);
          display: flex;
          flex-grow: 1;
          flex-direction: column;
          font-size: 24px;
          color: #fff;
          font-weight: 400;
          width: 100%;
          padding: 25px 5px 50px 19px;
        }
        @media (max-width: 991px) {
          .div-70 {
            margin-top: 15px;
            padding-right: 20px;
          }
        }
        .div-71 {
          text-align: center;
          align-self: end;
          width: 315px;
          padding-left: 95px;
          font: 35px Outfit, sans-serif;
        }
        .div-72 {
          font-family: Outfit, sans-serif;
          margin-top: 57px;
        }
        @media (max-width: 991px) {
          .div-72 {
            margin-top: 40px;
          }
        }
        .div-73 {
          font-family: Outfit, sans-serif;
          margin-top: 32px;
        }
        .div-74 {
          font-family: Outfit, sans-serif;
          margin-top: 28px;
        }
        .div-75 {
          font-family: Outfit, sans-serif;
          margin-top: 23px;
        }
        .div-76 {
          font-family: Outfit, sans-serif;
          margin-top: 21px;
        }
        .div-77 {
          font-family: Outfit, sans-serif;
          margin-top: 20px;
        }
        .div-78 {
          margin-top: 17px;
          width: 100%;
          max-width: 1305px;
        }
        @media (max-width: 991px) {
          .div-78 {
            max-width: 100%;
          }
        }
        .div-79 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-79 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .div-80 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            90deg,
            #211f48 0.4%,
            rgba(33, 31, 72, 0) 305.5%
          );
          display: flex;
          flex-direction: column;
          color: #fff;
          font-weight: 400;
          width: 100%;
          padding: 43px 15px;
        }
        @media (max-width: 991px) {
          .div-80 {
            max-width: 100%;
            margin-top: 14px;
          }
        }
        .div-81-title {
          font-size: 30px; 
          font-weight: bold; 
          color: #ffffff;
          line-height: 1.3; 
          margin-bottom: 10px; 
          margin-top: -15px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
          text-align: left; 
        }
        
        .div-81-description {
          text-align: left;
          align-self: center;
          font: 30px Outfit, sans-serif;
          font-weight: normal;
          color: #EEEEEE;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
        }

        .div-81 {
          text-align: left;
          align-self: center;
          padding: 0 0 5px 0;
          font: 30px Outfit, sans-serif;
        }
        .div-82 {
          text-align: left;
          display: flex;
          margin-top: 20px;
          flex-direction: column;
          padding: 0 5px;
        }
        @media (max-width: 991px) {
          .div-82 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-83 {
          font: 35px Outfit, sans-serif;
          
        }
        .div-83-image img {
          width: 100%;
          border-radius: 10px;
          margin-bottom: -10px;
         
        }
        .div-83-image {
          width: 100%; 
          height: auto; 
          border-radius: 13.5px;
          border: 2px solid #50529b;
          margin-top:20px;
        }
        
       
        .div-84 {
          text-align: right;
          align-self: end;
          margin-top: 20px;
          margin-bottom: -4%;
          font-size: 20px;
          font-family: 'Outfit', sans-serif;
        }
        
        .div-84 a {
          padding: 10px 20px; 
          background-color: #50529b; 
          color: #ffffff; 
          text-decoration: none; 
          border-radius: 5px; 
          border: none; 
          transition: background-color 0.3s, color 0.3s; 
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
        }
        
        .div-84 a:hover, .div-84 a:focus {
          background-color: #393e46; 
          color: #eeeeee; 
          outline: none; 
        }
        @media (max-width: 991px) {
          .div-84 {
            margin-top: 40px;
          }
        }
        .column-11 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 67%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-11 {
            width: 100%;
          }
        }
        .div-85 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            90deg,
            #211f48 -7.52%,
            rgba(33, 31, 72, 0) 99.55%
          );
          display: flex;
          flex-grow: 1;
          justify-content: space-between;
          gap: 20px;
          color: #fff;
          font-weight: 400;
          width: 100%;
          padding: 29px 16px;
        }
        @media (max-width: 991px) {
          .div-85 {
            max-width: 100%;
            margin-top: 14px;
            flex-wrap: wrap;
          }
        }
        .div-86 {
          align-self: start;
          margin-top: -3%;
          font: 35px Outfit, sans-serif;
          text-align: right; 
        }
        
        .div-86-image {
          display: flex; 
          justify-content: center; 
          align-items: center; 
          overflow: hidden; 
          margin-top: 20px; 
          margin-bottom: -350px;
        }
        
        .div-86-image img {
          max-width: 70%;
          height: auto;
          border-radius: 13.5px;
          border: 2px solid #50529b;
        }
        
        @media (max-width: 991px) {
          .div-86 {
            margin-top: 40px;
          }
        }
        .div-87 {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-87 {
            max-width: 100%;
          }
        }
        .div-88 {
          text-align: center;
          font: 35px Outfit, sans-serif;
        }

        .div-88-title {
          font-size: 40px; 
          font-weight: bold; 
          color: #ffffff; 
          line-height: 1.3; 
          margin-top: -3px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); 
          text-align: center; 
        }

        .div-86-description {
          text-align: center;
          align-self: center;
          font: 32px Outfit, sans-serif;
          font-weight: normal;
          color: #EEEEEE;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }


        @media (max-width: 991px) {
          .div-88 {
            max-width: 100%;
          }
        }
        .div-89 {
          text-align: right;
          align-self: end;
          margin-top: 400px;
          margin-right: 20px;
          font-size: 20px;
          font-family: 'Outfit', sans-serif;
        }
        
        .div-89 a {
          padding: 10px 20px; 
          background-color: #50529b; 
          color: #ffffff; 
          text-decoration: none; 
          border-radius: 5px; 
          border: none; 
          transition: background-color 0.3s, color 0.3s; 
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
        }
        
        .div-89 a:hover, .div-89 a:focus {
          background-color: #393e46; 
          color: #eeeeee; 
          outline: none; 
        }
        @media (max-width: 991px) {
          .div-89 {
            margin-top: 40px;
          }
        }
        .div-90 {
          margin-top: 23px;
          width: 100%;
          max-width: 1305px;
        }
        @media (max-width: 991px) {
          .div-90 {
            max-width: 100%;
          }
        }
        .div-91 {
          gap: 20px;
          display: flex;
        }
        @media (max-width: 991px) {
          .div-91 {
            flex-direction: column;
            align-items: stretch;
            gap: 0px;
          }
        }
        .column-12 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 67%;
          margin-left: 0px;
        }
        @media (max-width: 991px) {
          .column-12 {
            width: 100%;
          }
        }
        .div-92 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            270deg,
            #211f48 -58.41%,
            rgba(33, 31, 72, 0) 99.86%
          );

          gap: 20px;
          color: #fff;
          font-weight: 400;
          width: 100%;
          padding: 29px 16px;
        }
        @media (max-width: 991px) {
          .div-92 {
            max-width: 100%;
            margin-top: 14px;
            flex-wrap: wrap;
          }
        }
        .div-93 {
          align-self: start;
          margin-top: 88px;
          font: 35px Outfit, sans-serif;
        }
        .div-93-title {
          font-size: 40px;
          font-weight: bold;
          color: #ffffff;
          line-height: 1.3;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
          text-align: center; 
          margin-top: -100px;
        }
        


        .div-98-title {
          font-size: 30px; 
          font-weight: bold;
          color: #ffffff; 
          line-height: 1.3; 
          margin-bottom: 10px;
          margin-left: 0px;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3); 
          text-align: right;
        }
        @media (max-width: 991px) {
          .div-93 {
            margin-top: 40px;
          }
        }
        .div-94 {
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 991px) {
          .div-94 {
            max-width: 100%;
          }
        }
        .div-95 {
          text-align: center;
          font: 35px Outfit, sans-serif;
        }

        .div-95-description {
          text-align: center;
          font: 32px Outfit, sans-serif;
          font-weight: normal;
          color: #EEEEEE;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-top: -30px;
        }

        .div-95-image {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          margin-top: 20px;
          margin-bottom: -350px; 
        }
        

        .div-95-image img {
          max-width: 64%;
          height: auto;
          max-height: 400px;
          border-radius: 13.5px;
          border: 2px solid #50529b;
        }
        

        @media (max-width: 991px) {
          .div-95 {
            max-width: 100%;
          }
        }
        .div-96 {
          text-align: right;
          align-self: end;
          margin-top: 375px; 
          margin-right: 20px;
          font-size: 20px;
          font-family: 'Outfit', sans-serif;
        }
        
        .div-96 a {
          padding: 10px 20px;
          background-color: #50529b;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          border: none;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          transition: background-color 0.3s, color 0.3s;
        }
        
        .div-96 a:hover, .div-96 a:focus {
          background-color: #393e46; 
          color: #eeeeee; 
          outline: none; 
        }
        @media (max-width: 991px) {
          .div-96 {
            margin-top: 40px;
          }
        }        
        .column-13 {
          display: flex;
          flex-direction: column;
          line-height: normal;
          width: 33%;
          margin-left: 20px;
        }
        @media (max-width: 991px) {
          .column-13 {
            width: 100%;
          }
        }
        .div-97 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            270deg,
            #211f48 0.53%,
            rgba(72, 49, 157, 0) 527.86%
          );
          display: flex;
          flex-direction: column;
          color: #fff;
          font-weight: 400;
          width: 100%;
          padding: 27px 20px;
        }
        @media (max-width: 991px) {
          .div-97 {
            max-width: 100%;
            margin-top: 14px;
          }
        }
        .div-98 {
          text-align: center;
          align-self: center;
          font: 35px Outfit, sans-serif;
        }
        .div-99 {
          display: flex;
          margin-top: 60px;
          flex-direction: column;
          padding: 0 20px;
        }
        @media (max-width: 991px) {
          .div-99 {
            max-width: 100%;
            margin-top: 40px;
          }
        }
        .div-100 {
          font: 35px Outfit, sans-serif;
        }

        .div-100-image img {
          width: 100%; 
          height: auto; 
          border-radius: 13.5px;
          border: 2px solid #50529b;
          margin-top: 20px;
          margin-bottom: -220px;
        }
        .div-100-description {
          text-align: right;
          align-self: center;
          margin-left: -10px;
          margin-top: -80px;
          font: 30px Outfit, sans-serif;
          font-weight: normal;
          color: #EEEEEE;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5;
        }

        .div-101 {
          text-align: right;
          align-self: end;
          margin-top: 230px;
          font-size: 20px;
          font-family: 'Outfit', sans-serif;
        }
        
        .div-101 a {
          padding: 10px 20px; 
          background-color: #50529b; 
          color: #ffffff; 
          text-decoration: none; 
          border-radius: 5px; 
          border: none; 
          transition: background-color 0.3s, color 0.3s; 
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 
        }
        
        .div-101 a:hover, .div-101 a:focus {
          background-color: #393e46; 
          color: #eeeeee; 
          outline: none; 
        }
        @media (max-width: 991px) {
          .div-101 {
            margin-top: 40px;
          }
        }
        .div-102 {
          border-radius: 13.5px;
          border: 2px solid #50529b;
          background: linear-gradient(
            180deg,
            rgba(96, 50, 153, 0.31) 0%,
            rgba(96, 50, 153, 0) 100%
          );
          margin-top: 21px;
          width: 425px;
          max-width: 100%;
          justify-content: center;
          align-items: center;
          color: #fff;
          text-align: center;
          padding: 31px 60px;
          font: 400 30px/92% Outfit, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        .div-102:hover{
          background-color: rgba(96, 50, 153, 0.8);
          border-color: rgba(96, 50, 153, 0.8);
        }
        @media (max-width: 991px) {
          .div-102 {
            padding: 0 20px;
          }
        }
        .div-103 {
          background-color: rgba(31, 29, 71, 1);
          border: 2px solid rgba(80, 82, 155, 1);
          align-self: stretch;
          min-height: 107px;
          margin-top: 19px;
          width: 99.8%;
        }
        @media (max-width: 991px) {
          .div-103 {
            max-width: 100%;
          }
        }
        .footer {
          display: flex;
          flex-direction: column;
          background-color: rgba(31, 29, 71, 1);
          color: white;
          padding: 20px;
          font-family: 'Outfit', sans-serif;
          align-items: center; 
          
        }
        .footer-top {
          display: flex;
          justify-content: center; 
          flex-wrap: wrap; 
          gap: 20px; 
          width: 100%;
          max-width: 1300px; 
        }
        .footer-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10%;
        }
        
        .footer-section {
          flex: 1;
          text-align: center;
        }
        .load-more {
          text-align: center;
          margin-bottom: 20px; 
        } 
        .footer-section h2 {
          font-size: 40px;
          margin-bottom: 10px;
        }
        
        .footer-section p,
        .footer-section ul,
        .footer-section li {
          font-size: 25px;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        .footer-section p {
          margin-bottom: 15px;
        }
        .footer-section a {
          color: #ffffff;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        
        .footer-section a:hover,
        .footer-section a:focus {
          color: #cccccc;
        }
        
        .footer-bottom {
          position: relative; 
          text-align: center;
          padding-top: 20px;
          font-size: 25px;
        }
        .footer-bottom::after {
          content: '';
          display: block;
          height: 1px;
          background-color: rgba(80, 82, 155, 1); 
          width: 346%; 
          position: absolute;
          top: 0; 
          left: 50%; 
          transform: translateX(-50%); 
        }
        
      `}</style>
    </>
  );
}

export default App;
