import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

const Cards = ({ filter }) => {
  const data = useStaticQuery(graphql`
    {
      allProjects: allMdx(
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { fileAbsolutePath: { regex: "/(projects)/" } }
      ) {
        edges {
          node {
            slug
            frontmatter {
              title
              category
              thumbnail {
                childImageSharp {
                  half: fluid(maxWidth: 624, quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                  full: fluid(maxWidth: 1248, quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  return (
    <div className='flex flex-wrap'>
      {data.allProjects.edges
        .filter(function (node) {
          if (filter === '*') {
            return true
          } else {
            return node.node.frontmatter.category === filter
          }
        })
        .map(({ node }, index) => {
          if (node.frontmatter.thumbnail) {
            return (
              <article
                key={index}
                className={`relative h-48 md:h-card ${
                  (index + 1) % 3 === 0
                    ? 'flex-single'
                    : 'flex-single md:flex-double'
                }`}
              >
                <Img
                  className='absolute inset-0 w-full h-full'
                  fluid={
                    (index + 1) % 3 === 0
                      ? node.frontmatter.thumbnail.childImageSharp.full
                      : node.frontmatter.thumbnail.childImageSharp.half
                  }
                />
                <Link
                  to={'/' + node.slug}
                  className='absolute inset-0 w-full h-full flex justify-center items-center border-0 bg-white bg-opacity-75 transition duration-300 ease-in-out opacity:100 lg:opacity-0 hover:opacity-100'
                >
                  <h2 className='text-center text-lg lg:text-2xl align-middle inline-block text-light'>
                    {node.frontmatter.title}
                    <br />
                  </h2>
                  <h3 className='absolute left-0 top-0 border border-light px-2 py-1 m-3 text-sm lg:text-base text-light'>
                    {node.frontmatter.category}
                  </h3>
                </Link>
              </article>
            )
          } else {
            return (
              <article
                key={index}
                className={`relative h-48 md:h-card ${
                  (index + 1) % 3 === 0
                    ? 'flex-single'
                    : 'flex-single md:flex-double'
                }`}
              >
                <Link
                  to={'/' + node.slug}
                  className='absolute inset-0 w-full h-full flex justify-center items-center border-0 bg-gradient-to-r from-white to-light-bg'
                >
                  <h2 className='text-center text-lg lg:text-2xl align-middle inline-block text-light'>
                    {node.frontmatter.title}
                    <br />
                  </h2>
                  <h3 className='absolute left-0 top-0 border border-light px-2 py-1 m-3 text-sm lg:text-base text-light'>
                    {node.frontmatter.category}
                  </h3>
                </Link>
              </article>
            )
          }
        })}
    </div>
  )
}

export default Cards
