describe('Blog app', function() {
    beforeEach(function() {
      
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
      localStorage.clear()
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'testi t', username: 'testi', password: 'salainen'
      })
    })
  
    it('Login form is shown', function() {
      cy.contains('log in').click()
      cy.get('input:first')
      cy.get('input:last')
    })
    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.contains('log in').click()
        cy.get('input:first').type('testi')
        cy.get('input:last').type('salainen')
        cy.contains('login').click()
        cy.contains('blogs')
      })
  
      it('fails with wrong credentials', function() {
        cy.contains('log in').click()
        cy.get('input:first').type('testi')
        cy.get('input:last').type('testi')
        cy.contains('login').click()
        cy.contains('wrong credentials')
      })
    })
    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({username: 'testi', password: 'salainen'})
      })
  
      it('A blog can be created', function() {
        cy.createBlog({title: 'cypress hill', author:'B-Real', url:'example.com'})
        cy.contains('cypress hill B-Real')
      })
      it('a blog can be liked', function() {
        cy.createBlog({title: 'cypress hill', author:'B-Real', url:'example.com'})
        cy.get(':nth-child(1) > :nth-child(1) > button').click()
        cy.get('#like').click()
      })

      it('a blog can be removed', function() {
        cy.createBlog({title: 'cypress hill', author:'B-Real', url:'example.com'})
        cy.get(':nth-child(1) > :nth-child(1) > button').click()
        cy.get('#delete').click()
        cy.on('window:confirm', () => true)
      })
      
      it.only('blogs are sorted correctly', function() {
        cy.createBlog({title: 'viimeinen', author:'vipo-viimonen', url:'example.com'})
        cy.contains('viimeinen').contains('view').click()
        cy.contains('viimeinen').find('button').get('#like').eq(0).click()
        cy.get('#like').click()
        cy.get('#like').click()

        cy.visit('http://localhost:3000')
        cy.createBlog({title: 'cypress hill', author:'B-Real', url:'example.com'})
        cy.contains('cypress hill').contains('view').click();
        cy.contains('likes 0').find('button').contains('like').click()
        cy.createBlog({title: 'testi ', author:'B-testi', url:'example.com'})
        
        cy.get('.blog').eq(0).should('contain', '3')
        cy.get('.blog').eq(1).should('contain', '1')
        cy.get('.blog').eq(2).should('contain', '0')

      })

      
    })
  })
  