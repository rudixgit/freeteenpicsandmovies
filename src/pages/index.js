import React, { useState, useEffect } from 'react'

import { graphql } from 'gatsby'
import Layout from '../components/layout'
import axios from 'axios'
import SEO from '../components/seo'

const IndexPage = ({ data, pageContext }) => {
  const [data1, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('//graphqldbone.herokuapp.com/porns')
      setData(result.data)
    }
    fetchData()
  }, [])
  return (
    <Layout title={pageContext.keyword ? pageContext.keyword : 'Home'}>
      <SEO title={pageContext.keyword ? pageContext.keyword : 'Home'} />

      {data1.map((item) => (
        <div>
          <a href={item.url}>
            <img src={'//graphqldbone.herokuapp.com' + item.images.url} />
          </a>
        </div>
      ))}
      {pageContext.keyword ? (
        <div>
          {pageContext.text}
          {pageContext.items.map((item) => {
            return (
              <div>
                <a href={'/' + item.slug}>{item.item}</a>
              </div>
            )
          })}
        </div>
      ) : (
        <div>
          {data.allSitePage.nodes.map((item) => {
            return (
              <div>
                <a href={'' + item.path}>
                  <b>{item.context.keyword}</b>
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
