import React, { useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Card from "../components/card"

const PostedPage = props => {
  const { data } = props
  const allJobs = data.allGoogleSpreadsheetOpenPositionsJobs.edges
  const count = data.allGoogleSpreadsheetOpenPositionsJobs.totalCount;

  const emptyQuery = ""

  const [state, setState] = useState({
    filteredData: [],
    query: emptyQuery,
  })

  const handleInputChange = event => {
    const query = event.target.value
    const { data } = props
    // this is how we get all of our posts
    const jobs = data.allGoogleSpreadsheetOpenPositionsJobs.edges || []
    // return all filtered posts
    const filteredData = jobs.filter(job => {
      // destructure data from post frontmatter
      const {
        agency,
        location,
        postingTitle,
      } = job.node
      return (
        // standardize data with .toLowerCase()
        // return true if the description, title or tags
        // contains the query string
        agency.toLowerCase().includes(query.toLowerCase()) ||
        location.toLowerCase().includes(query.toLowerCase()) ||
        postingTitle.toLowerCase().includes(query.toLowerCase())
      )
    })
    // update state according to the latest query and results
    setState({
      query, // with current query string from the `Input` event
      filteredData, // with filtered data from posts.filter(post => (//filteredData)) above
    })
  }

  const { filteredData, query } = state
  const hasSearchResults = filteredData && query !== emptyQuery
  const jobs = hasSearchResults ? filteredData : allJobs
  const totalCount = hasSearchResults
    ? filteredData.length
    : data.allGoogleSpreadsheetOpenPositionsJobs.totalCount
  console.log(filteredData)
  console.log(filteredData.length)
  return (
    <Layout>
      <SEO title="Home" />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1120,
          padding: `1rem 0`,
        }}
      >
        <div className="topNotice">
          <Link to={`/`}>&larr; Go back to homepage</Link>
        </div>
        <div className="topjobsArea">
          <div style={{
            fontSize: `1.25em`,
            lineHeight: `1.65em`,
            margin: `0 0 .5em 0`,
          }}>
            {/*Search:{" "}*/}
            <input
              type="text"
              aria-label="Search"
              placeholder="Type to filter jobs..."
              onChange={handleInputChange}
            />
          </div>

          <div className="jobsTotal">
            Total Jobs: <b><span>{totalCount}</span></b>
          </div>

          <div className="jobsSortBy">
            Sort by:{" "}
            <Link
              to={`/posted`}
              style={{
                background: "#fff",
              }}
            >
              Posted Date
            </Link>{" "}
            | <Link to={`/closing`}>Closing Date</Link>
          </div>
        </div>


        <div
          style={{
            display: `grid`,
            boxSizing: `border-box`,
            gap: `1vw`,
            gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
            borderRadius: `calc(0.25rem)`,
            margin: `0px auto`,
            // padding: `1vw`,
          }}
        >
          {jobs.map(({ node }) => {
            const {
              agency,
              id,
              hrContact_recruiter,
              closeDate,
              linkForExternalApplicants,
              location,
              maxHourly,
              maxSalary,
              minHourly,
              minSalary,
              postingTitle,
              removeDate,
              postDate,
            } = node

            return (
              <Card
                key={id}
                href={linkForExternalApplicants}
                title={postingTitle}
                minSal={minSalary}
                maxSal={maxSalary}
                minHour={minHourly}
                maxHour={maxHourly}
                agency={agency}
                location={location}
                content={agency}
                closeDate={closeDate}
                postDate={postDate}
                removeDate={removeDate}
                recruiter={hrContact_recruiter}
              />
            )
          })}
        </div>
      </div>
    </Layout>
  )
};


export const query = graphql`
  query {
  allGoogleSpreadsheetOpenPositionsJobs(sort: {order: DESC, fields: postDate}) {
    totalCount
      edges {
        node {
          agency
          id
          hrContact_recruiter
          closeDate
          linkForExternalApplicants
          location
          maxHourly
          maxSalary
          minHourly
          minSalary
          postDate
          postingTitle
          removeDate
        }
      }
    }
  }
`

export default PostedPage
