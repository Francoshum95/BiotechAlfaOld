export default function NewsCard(props) {
  const {newsdata} = props;

  return (
    <div className="mt-5">
      <div className="bg-gray-600 w-full">
        <h1>Company News</h1>
      </div>
      <div className="w-full select-none">
        {
          newsdata.news &&
            newsdata.news.map(news => {
              return (
                <div className="mt-2 border border-black hover:border-white" key={newsdata.id}>
                  <a className="cursor-pointer lg:text-xl" href={news.url} target="_blank">
                    <h2 className="text-yellow-400">{news.title}</h2>
                    <article>{news.text}</article>
                    <time className="text-xs text-blue-400">{news.publishedDate}</time>
                  </a>

                </div>
              )
            })
        }
      </div>
      <div className="bg-gray-600 w-full mt-3">
        <h1>Press Release</h1>
      </div>
      <div className="w-full select-none">
      {
          newsdata.press &&
            newsdata.press.map(press => {
              return (
                <div className="mt-2 lg:text-xl" key={newsdata.id}>
                  <h2 className="text-yellow-400 ">{press.title}</h2>
                  <article className="lowercase">{press.text}</article>
                  <time className="text-xs text-blue-400">{press.date}</time>
                </div>
              )
            })
        }
      </div>
    </div>
  )
}
