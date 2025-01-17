import { Stack } from '@mui/material';
import { Link } from 'next/link';
import { logo } from '../../utils/constants';
import SearchBar from './SearchBar';

const Navbar = () => (
  <Stack
    direction='row'
    alignContent='center'
    p={2}
    sx={{position: 'sticky', background: '#000', top: 0, justifyContent: 'space-between'}}>
      <Link href="/" style={{display: 'flex', alignItems: 'center'}}>
        <img src={logo} alt='logo' height={45} />
      </Link>  
      <SearchBar />
    </Stack>
  
)
 

export default Navbar