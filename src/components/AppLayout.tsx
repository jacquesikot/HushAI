'use client';

import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: red;
  height: 100vh;
  width: 280px;
`;

const AppLayout = () => {
  return (
    <Wrapper>
      <p>sidebar</p>

      <p>sidebar</p>
    </Wrapper>
  );
};

export default AppLayout;
