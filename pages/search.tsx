import { useEffect, useState } from 'react';
import {  
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogContentText,
    DialogActions,
    Select, InputLabel, MenuItem, Checkbox} from '@mui/material';
    import { DatePicker } from '@mui/x-date-pickers';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
    import { LocalizationProvider } from '@mui/x-date-pickers';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";
import { getCookie } from 'typescript-cookie';


const SearchContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '20px',
});

const SearchForm = styled('form')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  marginTop: '20px',
});

const SearchButton = styled(Button)({
  marginTop: '20px',
});

const SearchResultList = styled('ul')({
  listStyleType: 'none',
  padding: 0,
  margin: 0,
});

const SearchResultItem = styled('li')({
  margin: '10px 0',
});

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [accountType, setAccountType] = useState('');
  const [username, setUsername] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState({pricePerDay: 10});
  const [type, setType] = useState('Boarding');
  const [status, setStatus] = useState('');
  const [fromUser, setFromUser] = useState('');
  const [toUser, setToUser] = useState('');
  const [price, setPrice] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  const [dateDue, setDateDue] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleClose = () => {
    setIsDialogOpen(false);
    setToUser('');
  };
  useEffect (() => {
    let accountType = getCookie('AccountType')
    let username = getCookie('Username')
    setUsername(username)
    setAccountType(accountType)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://192.168.4.45:3000/api/listingSearch/', {
        listingName: searchTerm,
      });

      setResults(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };
  const handleRowSelect = async (record) => {
    setSelectedRecord(record);
    setToUser(record.username)
    setIsDialogOpen(true);
  };

  const handleSave = async (record) => {
    console.log({
      type,
      status,
      fromUser,
      toUser,
      price,
      dateStarted,
      dateDue,
    });
    try {
      const response = await axios.post('http://192.168.4.45:3000/api/placeOrder', {
        type: type,
        status: 'Pending',
        fromUser: username,
        meetAndGreet: isChecked.toString(),
        toUser: toUser,
        price: estimatedPrice.toString(),
        dateStarted: dateStarted,
        dateDue: dateDue, // Due date is 7 days from now
      });
      console.log(response.data);
      alert('Order placed successfully');
    } catch (error) {
      console.error(error);
      alert('Error placing order');
    }
    setIsDialogOpen(false);
    setToUser('');
  };

  useEffect (() => {
    const calculatePrice = () => {
      if (dateStarted && dateDue) {
        const startDate = new Date(dateStarted);
        const dueDate = new Date(dateDue);
        const timeDiff = Math.abs(dueDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return selectedRecord.pricePerDay * diffDays;
      }
      return 0;
    };
    const estimatedPrice = calculatePrice();
    setEstimatedPrice(estimatedPrice);
  }, [dateStarted, dateDue])



  return (
 
    <SearchContainer>
      
           <TopNav accountType={accountType}/>
      <Typography variant="h4">Search for Listings</Typography>
      <SearchForm onSubmit={handleSubmit}>
        <TextField
          label="Search Term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </SearchButton>
      </SearchForm>
      {results.length === 0 ? (
        <Typography variant="body1">No results found.</Typography>
      ) : (
        <SearchResultList>

            <SearchResultItem>
            <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell>Listing Name</TableCell>
                    <TableCell>About Me</TableCell>
                    <TableCell>About Home</TableCell>
                    <TableCell>About Pets</TableCell>
                    <TableCell>Pictures URLs</TableCell>
                    <TableCell>Services</TableCell>
                    <TableCell>Size Can Host</TableCell>
                    <TableCell>Size Can Watch</TableCell>
                    <TableCell>Availability</TableCell>
                    <TableCell>Address</TableCell>
                    <TableCell>Typical Todo</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Price Per Day</TableCell>
                    <TableCell></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {results.map((record) => (
                    <TableRow key={record}>
                        <TableCell>{record.listingName}</TableCell>
                        <TableCell>{record.AboutMe}</TableCell>
                        <TableCell>{record.AboutHome}</TableCell>
                        <TableCell>{record.AboutPets}</TableCell>
                        <TableCell>{record.PicturesURLs}</TableCell>
                        <TableCell>{record.Services}</TableCell>
                        <TableCell>{record.SizeCanHost}</TableCell>
                        <TableCell>{record.SizeCanWatch}</TableCell>
                        <TableCell>{record.Availability}</TableCell>
                        <TableCell>{record.Address}</TableCell>
                        <TableCell>{record.TypicalTodo}</TableCell>
                        <TableCell>{record.username}</TableCell>
                        <TableCell>{record.pricePerDay}</TableCell>
                        <TableCell>
                      <Button variant="contained" color="primary" onClick={() => handleRowSelect(record)}>Select</Button>
                    </TableCell>
                    <Dialog open={isDialogOpen} onClose={handleClose}>
                      <DialogTitle>Selected Record:</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Enter the details:
                        </DialogContentText>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                          labelId="type-label"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          autoFocus
                          margin="dense"
                          label="Type"
                        >
                          <MenuItem value="Boarding">Boarding</MenuItem>
                          <MenuItem value="Walking">Walking</MenuItem>
                          <MenuItem value="Sitting">Sitting</MenuItem>
                        </Select>
                        <InputLabel id="type-label">Meet And Greet?</InputLabel>
                          <Checkbox
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                            color="primary"
                          />
                          <DialogTitle>Price Per Day:    {selectedRecord.pricePerDay}</DialogTitle>

                   <LocalizationProvider dateAdapter={AdapterDayjs}>
                   <DatePicker
                          label="Date Started"
                          value={dateStarted}
                          onChange={(date) => setDateStarted(date)}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                        <DatePicker
                          label="Date Due"
                          value={dateDue}
                          onChange={(date) => setDateDue(date)}
                          renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                  </LocalizationProvider>
                  <DialogTitle>Estimated Price:    {estimatedPrice}</DialogTitle>
                    
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose} color="primary">
                          Cancel
                        </Button>
                        <Button onClick={handleSave} color="primary">
                          Save
                        </Button>
                      </DialogActions>
                    </Dialog>
                    </TableRow>
                ))}
                {results.length === 0 && (
                    <TableRow>9
                        <TableCell colSpan={13}>No results found.</TableCell>
                    </TableRow>
                )}
            </TableBody>

            </Table>
            </TableContainer>

            </SearchResultItem>
        
        </SearchResultList>
      )}
      <BottomNav />
    </SearchContainer>
    
  );
};

export default SearchPage;
