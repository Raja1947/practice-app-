import React from 'react';
import {Page, Grid, LegacyCard} from '@shopify/polaris';


const pricing = () => {
  return (
    <Page fullWidth>
    <Grid>
      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
        <LegacyCard title="Sales" sectioned>
          <p>View a summary of your online store’s sales.</p>
          <p>free</p>
          <p><button>upgrade to pro</button></p>
        </LegacyCard>
      </Grid.Cell>
      <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
        <LegacyCard title="Orders" sectioned>
          <p>View a summary of your online store’s orders.</p>
    <p>Rs.2000</p>
    <p><button>Upgrade to Pro</button></p>
        </LegacyCard>
      </Grid.Cell>
    </Grid>
  </Page>
  )
}

export default pricing;
