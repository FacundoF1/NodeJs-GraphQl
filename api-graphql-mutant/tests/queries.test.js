const
  { startServer } = require('../src/index'),
  { request } = require('graphql-request'),
  gql = require( 'graphql-tag' );

  const STATS_QUERY = `
    query {
      stats{
        count_mutant_dna,
        count_human_dna
      }
    }
  `;
  let getHost = ( ) => '';
  beforeAll( async () => {
    // self.test = tester({
    //   url: `http://localhost:80/graphql`,
    //   contentType: 'application/json'
    // });

    const 
      app = await startServer();
      console.log(app.options.port);
    getHost = () => `http://localhost:${ app.options.port }`;
  });


  test("Register user", async () => {
    const res = await request( getHost(), STATS_QUERY );
    expect(res.stats)
    // .toEqual({ count_mutant_dna, count_human_dna });
  } );

