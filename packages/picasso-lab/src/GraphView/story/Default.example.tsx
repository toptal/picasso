import React, { useState } from 'react'
import {
  GraphData,
  GraphView,
  GraphNodeData,
  GraphNodeId
} from '@toptal/picasso-lab'

const data: GraphData = {
  nodes: [
    { id: 'component_31', color: '#f00', name: 'default \n something else' },
    { id: 'component_32', name: 'default' },
    { id: 'component_9537', name: 'Top 3%' },
    { id: 'component_9538', name: 'Why' },
    { id: 'component_9539', name: 'Clients' },
    { id: 'component_9540', name: 'Enterprise' },
    { id: 'component_9541', name: 'Community' },
    { id: 'component_9542', name: 'Blog' },
    { id: 'component_9543', name: 'About Us' },
    { id: 'component_9544', name: 'Toptal' },
    { id: 'component_10341', name: 'Apply as a Freelancer' },
    { id: 'component_10342', name: 'Hire Top Talent' },
    { id: 'component_10343', name: 'Log In' },
    { id: 'component_10344', name: 'Go to Your Profile' },
    { id: 'component_10377', name: 'Toptal Careers →' },
    { id: 'component_10378', name: 'Image #10378' },
    { id: 'component_10379', name: 'Image #10379' },
    { id: 'component_10380', name: 'Image #10380' },
    { id: 'component_10381', name: 'default' },
    { id: 'component_11482', name: 'portrait' },
    { id: 'component_11483', name: 'core_team_job_application_form' },
    { id: 'component_11484', name: 'Read more Toptal Insights' },
    { id: 'component_11485', name: 'core_team_job_application_form' },
    { id: 'component_3210991', name: "The World's Top Talent, On Demand™" },
    { id: 'component_3210992', name: 'Social' },
    {
      id: 'component_3210993',
      name: 'Copyright 2010 - %{current_year} Toptal, LLC'
    },
    { id: 'component_3210994', name: 'Most In-Demand Talent' },
    { id: 'component_3210995', name: 'About' },
    { id: 'component_3210996', name: 'Contact' },
    { id: 'component_3210997', name: 'Social Link #9498' },
    { id: 'component_3210998', name: 'Social Link #9499' },
    { id: 'component_3210999', name: 'Social Link #9500' },
    { id: 'component_3211000', name: 'Social Link #9501' },
    { id: 'component_3211001', name: 'Privacy Policy' },
    { id: 'component_3211002', name: 'Website Terms' },
    { id: 'component_3211003', name: 'iOS Developers' },
    { id: 'component_3211004', name: 'Front-End Developers' },
    { id: 'component_3211005', name: 'UX Designers' },
    { id: 'component_3211006', name: 'UI Designers' },
    { id: 'component_3211007', name: 'Financial Modeling Consultants' },
    { id: 'component_3211008', name: 'Interim CFOs' },
    { id: 'component_3211009', name: 'Digital Project Managers' },
    { id: 'component_3211010', name: 'Top 3%' },
    { id: 'component_3211011', name: 'Clients' },
    { id: 'component_3211012', name: 'Freelance Developers' },
    { id: 'component_3211013', name: 'Freelance Designers' },
    { id: 'component_3211014', name: 'Freelance Finance Experts' },
    { id: 'component_3211015', name: 'Freelance Project Managers' },
    { id: 'component_3211016', name: 'Freelance Product Managers' },
    { id: 'component_3211017', name: 'Specialized Services' },
    { id: 'component_3211018', name: 'About Us' },
    { id: 'component_3211019', name: 'Contact Us' },
    { id: 'component_3211020', name: 'Press Center' },
    { id: 'component_3211021', name: 'Careers' },
    { id: 'component_3211022', name: 'FAQ' },
    { id: 'component_3216412', name: 'Director of SEO' },
    { id: 'component_3216413', name: 'SEO #3216413' },
    { id: 'component_3216414', name: 'Job Data #3216414' },
    { id: 'component_3216415', name: 'Team Section #3216415' },
    {
      id: 'component_3216416',
      name: 'Core Team Job Application Form #3216416'
    },
    { id: 'component_3216417', name: 'Sharing Widget #3216417' },
    { id: 'component_3216418', name: 'View the Whole Team' },
    {
      id: 'component_3216419',
      name: 'How many years of experience do you have leading an SEO team?'
    }
  ],
  links: [
    { source: 'component_31', target: 'component_3210991', label: 'logo_link' },
    {
      source: 'component_31',
      target: 'component_3210992',
      label: 'social_media'
    },
    { source: 'component_31', target: 'component_3210993', label: 'legal' },
    { source: 'component_31', target: 'component_3210994', label: 'columns' },
    { source: 'component_31', target: 'component_3210995', label: 'columns' },
    { source: 'component_31', target: 'component_3210996', label: 'columns' },
    { source: 'component_32', target: 'component_9544', label: 'logo_link' },
    {
      source: 'component_32',
      target: 'component_9537',
      label: 'navigation_links'
    },
    {
      source: 'component_32',
      target: 'component_9538',
      label: 'navigation_links'
    },
    {
      source: 'component_32',
      target: 'component_9539',
      label: 'navigation_links'
    },
    {
      source: 'component_32',
      target: 'component_9540',
      label: 'navigation_links'
    },
    {
      source: 'component_32',
      target: 'component_9541',
      label: 'navigation_links'
    },
    {
      source: 'component_32',
      target: 'component_9542',
      label: 'navigation_links'
    },
    {
      source: 'component_32',
      target: 'component_9543',
      label: 'navigation_links'
    },
    { source: 'component_32', target: 'component_10341', label: 'cta_links' },
    { source: 'component_32', target: 'component_10342', label: 'cta_links' },
    { source: 'component_32', target: 'component_10343', label: 'cta_links' },
    { source: 'component_32', target: 'component_10344', label: 'cta_links' },
    {
      source: 'component_10381',
      target: 'component_10377',
      label: 'more_link'
    },
    { source: 'component_10381', target: 'component_10378', label: 'images' },
    { source: 'component_10381', target: 'component_10379', label: 'images' },
    { source: 'component_10381', target: 'component_10380', label: 'images' },
    { source: 'component_11483', target: 'component_11482', label: 'images' },
    { source: 'component_11485', target: 'component_11484', label: 'ctas' },
    {
      source: 'component_3210992',
      target: 'component_3210997',
      label: 'links'
    },
    {
      source: 'component_3210992',
      target: 'component_3210998',
      label: 'links'
    },
    {
      source: 'component_3210992',
      target: 'component_3210999',
      label: 'links'
    },
    {
      source: 'component_3210992',
      target: 'component_3211000',
      label: 'links'
    },
    {
      source: 'component_3210993',
      target: 'component_3211001',
      label: 'pages'
    },
    {
      source: 'component_3210993',
      target: 'component_3211002',
      label: 'pages'
    },
    {
      source: 'component_3210994',
      target: 'component_3211003',
      label: 'pages'
    },
    {
      source: 'component_3210994',
      target: 'component_3211004',
      label: 'pages'
    },
    {
      source: 'component_3210994',
      target: 'component_3211005',
      label: 'pages'
    },
    {
      source: 'component_3210994',
      target: 'component_3211006',
      label: 'pages'
    },
    {
      source: 'component_3210994',
      target: 'component_3211007',
      label: 'pages'
    },
    {
      source: 'component_3210994',
      target: 'component_3211008',
      label: 'pages'
    },
    {
      source: 'component_3210994',
      target: 'component_3211009',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211010',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211011',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211012',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211013',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211014',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211015',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211016',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211017',
      label: 'pages'
    },
    {
      source: 'component_3210995',
      target: 'component_3211018',
      label: 'pages'
    },
    {
      source: 'component_3210996',
      target: 'component_3211019',
      label: 'pages'
    },
    {
      source: 'component_3210996',
      target: 'component_3211020',
      label: 'pages'
    },
    {
      source: 'component_3210996',
      target: 'component_3211021',
      label: 'pages'
    },
    {
      source: 'component_3210996',
      target: 'component_3211022',
      label: 'pages'
    },
    { source: 'component_3216412', target: 'component_3216413', label: 'seo' },
    {
      source: 'component_3216412',
      target: 'component_32',
      label: 'navbar_section'
    },
    {
      source: 'component_3216412',
      target: 'component_3216414',
      label: 'job_data'
    },
    {
      source: 'component_3216412',
      target: 'component_3216415',
      label: 'team_section'
    },
    {
      source: 'component_3216412',
      target: 'component_3216416',
      label: 'application_form'
    },
    {
      source: 'component_3216412',
      target: 'component_11483',
      label: 'testimonial'
    },
    {
      source: 'component_3216412',
      target: 'component_11485',
      label: 'blog_posts_section'
    },
    {
      source: 'component_3216412',
      target: 'component_3216417',
      label: 'sharing_widget'
    },
    {
      source: 'component_3216412',
      target: 'component_10381',
      label: 'working_at_toptal_section'
    },
    {
      source: 'component_3216412',
      target: 'component_31',
      label: 'footer_section'
    },
    { source: 'component_3216415', target: 'component_3216418', label: 'cta' },
    {
      source: 'component_3216416',
      target: 'component_3216419',
      label: 'additional_questions'
    }
  ]
}

const Example = () => {
  const [selected, setSelected] = useState<GraphNodeId>(1)

  const handleNodeClick = (node: GraphNodeData) => {
    console.log(node.id)
    setSelected(node.id)
  }

  return (
    <div style={{ height: '60vh' }}>
      <GraphView data={data} selected={selected} onClick={handleNodeClick} />
    </div>
  )
}

export default Example
