import React, { useState, useEffect } from "react";
import axios from 'axios';

function App(props) {

  const [news, setNews] = useState(null);
  const [weather, setWeather] = useState(null);
  const [stocks, setStocks] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/weather'); //make sure this has localhost:8080 infront of it.
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

    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/stocks');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks data:', error.message);
      }
    }

    fetchWeather();
    fetchNews();
    fetchStocks();
  }, []);

  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">Welcome Name</div>
          <div className="div-4">
            <div className="div-5">Weather</div>
            <div className="div-6">News</div>
            <div className="div-7">Stocks</div>
          </div>
          <div className="div-8">Time</div>
        </div>
        <div className="div-9">
          <div className="div-10">
            <div className="column">
              <div className="div-11">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/03de3ecba4fd9821e3ad7f94067edce92faec6a1c2269b35c02dc151061e9f77?apiKey=bfadb715bc704462b9199ff254b319bd&"
                  className="img"
                />
                <div className="div-12">
                  <div className="div-13">8.4</div>
                  <div className="div-14">
                    <span style={{fontSize: '28px'}}>° C</span>{" "}
                  </div>
                </div>
                <div className="div-15">London, Ontario</div>
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
                          <div className="div-22">8.4</div>
                          <div className="div-23">
                            <span style={{fontSize: '28px'}}>° C</span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="column-3">
                      <div className="div-24">
                        <div className="div-25">Sunrise</div>
                        <div className="div-26">Time</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="div-27">
                  <div className="div-28">
                    <div className="column-4">
                      <div className="div-29">
                        <div className="div-30">Humidity</div>
                        <div className="div-31">79%</div>
                      </div>
                    </div>
                    <div className="column-5">
                      <div className="div-32">
                        <div className="div-33">Sunset</div>
                        <div className="div-34">Time</div>
                      </div>
                    </div>
                    <div className="column-6">
                      <div className="div-35">
                        <div className="div-36">Max Temp</div>
                        <div className="div-37">
                          <div className="div-38">8.4</div>
                          <div className="div-39">
                            <span style={{fontSize: '28px'}}>° C</span>{" "}
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
        <div className="div-40">
          <div className="div-41">
            <div className="div-42">􀊫</div>
            <div className="div-43">Search Stocks </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f9c373d0804712ab5f64a26887c68fe207244ccbb93b4f4ebe06cdeca2acb4d?apiKey=bfadb715bc704462b9199ff254b319bd&"
              className="img-2"
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
                        {stocks[1].ticker} (Microsoft)
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
        <div className="div-102">Refresh Stocks</div>
        <div className="div-78">
          <div className="div-79">
            <div className="column">
              <div className="div-80">
              <div className="div-81">
              {news && news.articles && news.articles.length > 0 && (
                <div className="div-81-title">
                  {news.articles[3].title} 
                </div>
              )}
              </div>
                <div className="div-82">
                <div className="div-83">
                  {news && news.articles && news.articles.length > 0 && (
                    <div className="div-81">
                      {news.articles[3].description} 
                    </div>
                  )}
                  <div className="div-83-image">
                    {news && news.articles && news.articles.length > 0 && (
                      <img src={news.articles[3].urlToImage} alt="Article" />
                    )}
                  </div>
                </div>
                <div className="div-84">
                  {news && news.articles && news.articles.length > 0 && (
                    <a href={news.articles[3].url} target="_blank" rel="noopener noreferrer">
                      Read More
                    </a>
                  )}
                </div>

                </div>
              </div>
            </div>
            <div className="column-11">
                <div className="div-85">
                  <div className="div-87">
                    <div className="div-88">
                      {news && news.articles && news.articles.length > 0 && (
                        <div className="div-88">
                          {news.articles[8].title} 
                        </div>
                      )}
                      <br />
                    </div>
                    <div className="div-86">
                      {news && news.articles && news.articles.length > 0 && (
                        <div className="div-81">
                          {news.articles[8].description} 
                        </div>
                      )}
                      <div className="div-86-image">
                        {news && news.articles && news.articles.length > 0 && (
                          <img src={news.articles[8].urlToImage} alt="Article" />
                        )}
                      </div>
                    </div>
                    <div className="div-89">
                      {news && news.articles && news.articles.length > 0 && (
                        <a href={news.articles[8].url} target="_blank" rel="noopener noreferrer">
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
                      <div className="div-88">
                        {news.articles[10].title} 
                      </div>
                    )}
                    <br />
                  </div>
                  <div className="div-94">
                    <div className="div-95">
                      {news && news.articles && news.articles.length > 0 && (
                        <div className="div-81">
                          {news.articles[10].description} 
                        </div>
                      )}
                      <div className="div-86-image">
                        {news && news.articles && news.articles.length > 0 && (
                          <img src={news.articles[10].urlToImage} alt="Article" />
                        )}
                      </div>
                    </div>
                    <div className="div-96">
                      {news && news.articles && news.articles.length > 0 && (
                        <a href={news.articles[10].url} target="_blank" rel="noopener noreferrer">
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
                    <div className="div-81">
                      {news.articles[6].title} 
                    </div>
                  )}
                  <br />
                </div>
                <div className="div-99">
                  <div className="div-100">
                  {news && news.articles && news.articles.length > 0 && (
                    <div className="div-100-description">
                      {news.articles[6].description} 
                    </div>
                  )}
                  <div className="div-100-image">
                    {news && news.articles && news.articles.length > 0 && (
                      <img src={news.articles[6].urlToImage} alt="Article" />
                    )}
                  </div>
                  </div>
                  <div className="div-101">
                  {news && news.articles && news.articles.length > 0 && (
                    <a href={news.articles[6].url} target="_blank" rel="noopener noreferrer">
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
        <div className="div-103" />
      </div>
      <style jsx>{`
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
          width: 100%;
          align-items: start;
          justify-content: space-between;
          gap: 20px;
          font-size: 32px;
          color: #eee;
          font-weight: 400;
          text-align: center;
          line-height: 86%;
          padding: 16px 30px 25px;
        }
        @media (max-width: 991px) {
          .div-2 {
            max-width: 100%;
            flex-wrap: wrap;
            padding: 0 20px;
          }
        }
        .div-3 {
          margin-top: 14px;
          flex-grow: 1;
          flex-basis: auto;
          font: 600 64px/43% Outfit, -apple-system, Roboto, Helvetica,
            sans-serif;
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
        }
        .div-6 {
          font-family: Outfit, sans-serif;
          flex-grow: 1;
          flex-basis: auto;
        }
        .div-7 {
          font-family: Outfit, sans-serif;
          flex-grow: 1;
        }
        .div-8 {
          color: #fff;
          text-align: right;
          font-family: Outfit, sans-serif;
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
          padding: 23px 10px;
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
        @media (max-width: 991px) {
          .div-22 {
            font-size: 40px;
          }
        }
        .div-23 {
          letter-spacing: -1.2px;
          align-self: start;
          font: 24px Inter, sans-serif;
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
          padding: 25px 0px 25px 31px;
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
          align-self: end;
          margin-top: 53px;
          font: 100px Outfit, sans-serif;
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
          padding: 23px 10px;
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
        }
        .div-31 {
          letter-spacing: 3px;
          margin-top: 39px;
          font: 100px Outfit, sans-serif;
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
          padding: 20px 2px 35px 0px;
          margin-left: 46px;
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
        }
        .div-34 {
          color: #fff;
          letter-spacing: 3px;
          align-self: end;
          margin-top: 48px;
          font: 100px Outfit, sans-serif;
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
          max-width: 1306px;
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
          justify-content: center;
          align-self: stretch;
          aspect-ratio: 1;
          color: #393e46;
          white-space: nowrap;
          text-align: center;
          padding: 6px;
          font: 500 18px/278% SF Pro Display, -apple-system, Roboto, Helvetica,
            sans-serif;
        }
        @media (max-width: 991px) {
          .div-42 {
            white-space: initial;
          }
        }
        .div-43 {
          color: #eee;
          font-feature-settings: "clig" off, "liga" off;
          letter-spacing: -0.41px;
          align-self: stretch;
          flex-grow: 1;
          flex-basis: auto;
          margin: auto 0;
          font: 400 20px/110% Outfit, -apple-system, Roboto, Helvetica,
            sans-serif;
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
          width: 18px;
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
        }
        .div-83-image {
          width: 100%; /* Adjust as needed */
          height: auto; /* Maintain aspect ratio */
          border-radius: 13.5px;
          border: 2px solid #50529b;
        }
        
        .div-84 {
          text-align: right;
          align-self: end;
          margin-top: 20px;
          margin-bottom: -4%;
          font: 20px Outfit, sans-serif;
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
          text-align: right; /* Align text to the right */
        }
        
        .div-86-image {
          align-self: flex-start; /* Align image to the left */
          margin-top: -10%; /* Add some spacing between the text and the image */
          margin-bottom: -4%; /* Add some spacing between the text and the image */
          
          
        }
        
        .div-86-image img {
          width: 70%; /* Adjust as needed */
          height: auto; /* Maintain aspect ratio */
          border-radius: 13.5px;
          border: 2px solid #50529b;
          margin-bottom: -310px;
          margin-top: 120px;
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
        @media (max-width: 991px) {
          .div-88 {
            max-width: 100%;
          }
        }
        .div-89 {
          text-align: right;
          align-self: end;
          margin-top: 370px;
          
          font: 20px Outfit, sans-serif;
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
        @media (max-width: 991px) {
          .div-95 {
            max-width: 100%;
          }
        }
        .div-96 {
          text-align: right;
          align-self: end;
          margin-top: 325px;
          font: 20px Outfit, sans-serif;
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
          width: 100%; /* Adjust as needed */
          height: auto; /* Maintain aspect ratio */
          border-radius: 13.5px;
          border: 2px solid #50529b;
          margin-top: 20px;
          margin-bottom: -220px;
        }
        .div-100-description {
          text-align: left;
          align-self: center;
          margin-left: -20px;
          margin-top: -80px;
          font: 30px Outfit, sans-serif;
        }

        .div-101 {
          text-align: right;
          align-self: end;
          margin-top: 241px;
          font: 20px Outfit, sans-serif;
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
          width: 100%;
        }
        @media (max-width: 991px) {
          .div-103 {
            max-width: 100%;
          }
        }
      `}</style>
    </>
  );
}

export default App;
