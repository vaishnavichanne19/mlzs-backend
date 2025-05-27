import React from 'react'
import { GeneralTableHome } from './General'
import { DocumentHome } from './Document'
import { ResultHome } from './Result'
import { StaffTableHome } from './Staff'
import { InfrastructureTableHome } from './Infrastructure'
import { SessionTableHome } from './SessionHome'

const MandatoryHome = () => {
  return (
    <div>
      <GeneralTableHome/>
      <DocumentHome/>
      <ResultHome/>
      <SessionTableHome/>
      <StaffTableHome/>
      <InfrastructureTableHome/>
      </div>
  )
}

export default MandatoryHome
