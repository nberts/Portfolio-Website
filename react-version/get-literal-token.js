// get-literal-token.js - RUN THIS ONCE LOCALLY
async function getToken() {
  const email = ''
  const password = '' 
  
  try {
    const response = await fetch('https://literal.club/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
            }
          }
        `,
        variables: { email, password }
      })
    });
    
    const data = await response.json();
    
    if (data.data && data.data.login) {
      console.log('SUCCESS! Your token is:');
      console.log(data.data.login.token);
      console.log('\nAdd this to your .env.local file as:');
      console.log(`LITERAL_TOKEN=${data.data.login.token}`);
    } else {
      console.log('Error:', data);
    }
  } catch (error) {
    console.error('Failed:', error);
  }
}

getToken();