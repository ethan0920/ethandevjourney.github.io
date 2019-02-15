import React from 'react';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import SEO from '../components/seo';
import { graphql } from 'gatsby'

function BlogPost(props) {

    const post = props.data.markdownRemark;
    const url = props.data.site.siteMetadata.siteUrl
    const { title, description } = post.frontmatter;
    const thumbnail = post.frontmatter.image.childImageSharp.resize.src
    return (
        <Layout>
            <SEO />
            <div>
                <h1>{title}</h1>
                <Img fluid={post.frontmatter.image.childImageSharp.fluid} />
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
            </div>
        </Layout>
    )
}

export default BlogPost

export const query = graphql`
 query PostQuery($slug: String!) {
     markdownRemark(fields: { slug: { eq: $slug } }) {
       html
       frontmatter {
        title
        description
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
            fluid(maxWidth: 786) {
              ...GatsbyImageSharpFluid
            }
          }
       }
       }
   }
  site {
    siteMetadata {
        siteUrl
      }
   }
}
`