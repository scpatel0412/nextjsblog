import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI =
  'https://api-ap-south-1.graphcms.com/v2/cl1g3y72n3q4s01xf0d558gt9/master'

const apiToken = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDkwNjY3MjIsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aC0xLmdyYXBoY21zLmNvbS92Mi9jbDFnM3k3Mm4zcTRzMDF4ZjBkNTU4Z3Q5L21hc3RlciIsImh0dHBzOi8vbWFuYWdlbWVudC1uZXh0LmdyYXBoY21zLmNvbSJdLCJpc3MiOiJodHRwczovL21hbmFnZW1lbnQuZ3JhcGhjbXMuY29tLyIsInN1YiI6IjBkMDA5ZDk1LWE2ODItNDg0Yy1hZWIzLWM1ODlhZGFhZmZiZSIsImp0aSI6ImNsMWtqcXlkMzdjOGgwMXhmYTVsbDc0NTQifQ.Ld-HFhmoXM3hU3rXyiibR9F8qxLarAivSSCu3-6KWnz6ScHch0d-H0U0HEnKfyQGPmEZRujtNKJsTdaryHbOdwpzJzDZykSfBc7njXK9ajgsGeULvgeLKRnxcU8M0AQz5CqXplPCDdimSvG4c3QFqHyZKtJD-H3_UBkz3mUJrylz9PRnUp4NaUhAGx6YbP8NanoP9f2mp0s6P114QC0WiwfeoYW86mANo72r_XnZv5_q_toKylEwNqCTnfp0gPE6IxYFCUyXC8UklCBWuxaN4FGN_e3cX8y9Dcqm56y2kzbC9UdwuagjqStrgRzKkB-UDKlkbmwfJD5by0U2Dchq3G2z99Ly2g61Wl21QQTGN8Nzuq8jFn3qs2gT_wcEkhwQ98EKgvVmUCaYKpS77jYH-cBh54pd7oswoCtNJG7RzxhiMTtTmANAcYMRaBUtFLTz0nWE1mzhH10iYtojPyP4H-ygaoiFS1zMARCWOWy7KRwJRaNzBwShc55784WU7K6XvMTrE8Vsg_u9ZAZIGo_3YwTbrR44pk5_ywI94zRIJbQnrl4K4JKIkfWmuqo0mPLkq8eS71XX9I6KTHmpxUsy1EcSZBvFeNHRoKTfq-jmsun-UsY0Q7trcAPSPygGE-RvEQa5ig8y-4_Gk2HuAv2RMWygpbnD6XhYPDVPGov09H8`

export default async function asynchandler(req: any, res: any) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${apiToken}`,
    },
  })

  const query = gql`
    mutation CreateComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      ) {
        id
      }
    }
  `

  const result = await graphQLClient.request(query, {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment,
    slug: req.body.slug,
  })

  return res.status(200).send(result)
}
