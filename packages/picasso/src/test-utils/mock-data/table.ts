const createData = (
  id: number,
  name: string,
  talentType: string,
  company: string,
  role: string,
  country: string
) => ({ id, name, talentType, company, role, country })

const data = [
  createData(
    0,
    'Delia Floyd',
    'Designer',
    'Airbnb',
    'UX lead',
    'United States'
  ),
  createData(1, 'Linnie Sims', 'Designer', 'Facebook', 'Art director', 'Spain'),
  createData(
    2,
    'Charles Watson',
    'Developer',
    'Amazon',
    'Ruby developer',
    'Germany'
  ),
  createData(
    3,
    'Leila Pena',
    'Developer',
    'Invision',
    'Web developer',
    'Poland'
  ),
  createData(
    4,
    'Logan Burton',
    'Developer',
    'Microsoft',
    'CTO',
    'United States'
  )
]

export default data
