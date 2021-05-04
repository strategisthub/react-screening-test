import { cleanup, render, screen } from "@testing-library/react"
import React from 'react';
import Article from "./Article"
import DATA from './../MOCK_DATA.json'
import {Article as _article, sortArticles} from './../App'

cleanup()

describe("testing article component", () => {
    it("renders correctly", () => {
        render(<Article {...DATA[0]}/>)
        cleanup()
    })
    it("renders image", () => {
        render(<Article {...DATA[0]} />)
        const imageEl = screen.getByTestId("image")
        expect(imageEl).toBeInTheDocument()

        cleanup()
    })
    it("renders upvote icon", () => {
        render(<Article {...DATA[0]} />)
        const upvoteIconEl = screen.getByTestId("upvoteicon")
        expect(upvoteIconEl).toBeInTheDocument()
        
        cleanup()
    })
})

describe("testing sorting function", () => {
    it("sorts by most-upvotes correctly", () => {
        const articles:_article[] = [{...DATA[0], id: 1, upvotes: 7}, {...DATA[1], id: 2, upvotes: 8}, {...DATA[2], id: 3, upvotes: 9}]
        const sortedArticles = sortArticles("most-upvotes", articles)
        expect(sortedArticles[0]).toHaveProperty("id", 3)
        expect(sortedArticles[1]).toMatchObject({id: 2})
        expect(sortedArticles[2]).toMatchObject({id: 1})
    })
    it("sorts by most-recent correctly", () => {
        const articles:_article[] = [{...DATA[0], id: 1, published_at: "1/1/1970"}, {...DATA[1], id: 2, published_at: "1/2/1970"}, {...DATA[2], id: 3, published_at: "1/3/1970"}]
        const sortedArticles = sortArticles("most-recent", articles)
        expect(sortedArticles[0]).toHaveProperty("id", 3)
        expect(sortedArticles[1]).toMatchObject({id: 2})
        expect(sortedArticles[2]).toMatchObject({id: 1})
    })
    it("it returns the original array for default sort", () => {
        const articles: _article[] = DATA;
        expect(sortArticles("default", articles)).toBe(articles)
    })
})