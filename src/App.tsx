import React, { useMemo, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import DUMMY_DATA from './MOCK_DATA.json'

import Article from './components/Article';


export interface Article {
  id: number;
  title: string;
  upvotes: number;
  published_at: string;
  featured_image: string;

  [key: string]: any;
}

type SortingMethods = "default" | "most-upvotes" | "most-recent"
export const sortArticles = (method: SortingMethods, articles: Article[]): Article[] => {
  switch (method) {
    case "default":
      return articles
    case "most-recent":
      return [...articles].sort((a, b) => {
        const da = new Date(a.published_at)
        const db = new Date(b.published_at)
        return db.valueOf() - da.valueOf()
      })
    case "most-upvotes":
      return [...articles].sort((a, b) => b.upvotes - a.upvotes)

    default:
      return articles
  }
  return articles;
}


const App = () => {
  const [articles, setArticles] = useState(DUMMY_DATA);
  
  const [sortingMethod, setSortingMethod] = useState<SortingMethods>("default")
  
  const sortedArticles = useMemo(() => sortArticles(sortingMethod, articles), [sortingMethod, articles])
  
  console.log(sortingMethod === 'default')
  return (
    <div className="container my-3">
      <div className="display-3 mb-3">Articles</div>
      <div className="row my-3 ">

        <div className="articles col-8">

          <div className="btn-group my-3">
            <button className={"btn btn-sm" + (sortingMethod === 'default' ? ' btn-primary' : ' btn-secondary')} onClick={e=>setSortingMethod("default")}>Sort by default</button>
            <button className={"btn btn-sm" + (sortingMethod === 'most-upvotes' ? ' btn-primary' : ' btn-secondary')} onClick={e=>setSortingMethod("most-upvotes")}>Sort by most upvotes</button>
            <button className={"btn btn-sm" + (sortingMethod === 'most-recent' ? ' btn-primary' : ' btn-secondary')} onClick={e=>setSortingMethod("most-recent")}>Sort by most recent</button>
          </div>
          {
            sortedArticles.map(article => <Article key={article.id} {...article} />)
          }
        </div>
        <div className="col">
        </div>
      </div>

    </div>

  );
}

export default App;
