import React, { useState, useEffect } from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout'
import axios from 'axios'
import SEO from '../components/seo'

const IndexPage = ({ data, pageContext }) => {
  const [data1, setData] = useState({ hits: [] })
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search_by_date?tags=story'
      )
      setData(result.data)
    }
    fetchData()
  }, [])
  return (
    <Layout title={pageContext.keyword ? pageContext.keyword : 'Home'}>
      <SEO title={pageContext.keyword ? pageContext.keyword : 'Home'} />
      {data1.hits.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
      {pageContext.keyword ? (
        <div>
          {pageContext.text}
          {pageContext.items.map((item) => {
            return (
              <div>
                <a href={process.env.URL + '' + item.slug}>{item.item}</a>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          {data.allSitePage.nodes.map((item) => {
            return (
              <div>
                <a href={process.env.URL + '/' + item.path}>
                  {item.context.keyword}
                </a>
              </div>
            )
          })}
        </div>
      )}
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allSitePage(limit: 10, skip: 10) {
      nodes {
        context {
          keyword
        }
        path
      }
    }
  }
`
export default IndexPage
