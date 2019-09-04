import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import theme from '../theme'
import { staticRoutes } from '../routes'

const Container = styled.header`
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  background-color: ${theme.mainColor};
  color: ${theme.inverseTextColor};
`

const Grid = styled.div`
  display: grid;
  max-width: 900px;
  width: 96%;
  min-height: 70px;
  margin-left: auto;
  margin-right: auto;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto;
  grid-template-areas: 'title . menu';
  align-items: center;

  @media only screen and (max-width: 640px) {
    display: block;
    text-align: center;
  }
`

const Title = styled.div`
  grid-area: title;
  font-size: 2.3em;

  a {
    text-decoration: none;
  }
`

const Menu = styled.div`
  grid-area: menu;
  font-size: 1.3em;
`

const MenuItem = styled.span`
  &:not(:last-child) {
    margin-right: 0.4em;
  }

  a {
    border-width: 0 0 2px 0;
    border-style: solid;
    border-color: transparent;
    text-decoration: none;
  }

  a:hover {
    color: ${theme.accentColor};
  }
`

const ActiveMenuItemLinkStyle = {
  borderColor: theme.accentColor,
}

export const Header = () => (
  <Container>
    <Grid>
      <Title>
        <Link to={staticRoutes.home.path}>Alexey Golub</Link>
      </Title>

      <Menu>
        <MenuItem>
          <Link
            activeStyle={ActiveMenuItemLinkStyle}
            partiallyActive={false}
            to={staticRoutes.home.path}
          >
            home
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            activeStyle={ActiveMenuItemLinkStyle}
            partiallyActive={true}
            to={staticRoutes.projects.path}
          >
            projects
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            activeStyle={ActiveMenuItemLinkStyle}
            partiallyActive={true}
            to={staticRoutes.blog.path}
          >
            blog
          </Link>
        </MenuItem>
      </Menu>
    </Grid>
  </Container>
)
