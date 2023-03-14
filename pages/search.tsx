import React, { useState } from 'react';
import {   Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TextField} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import TopNav from "../components/nav/TopNav";
import BottomNav from "../components/nav/BottomNav";

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
  const [toUser, setToUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

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

  return (
 
    <SearchContainer>
           <TopNav />
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
          {results.map((record) => (
            <SearchResultItem key={record}>
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
                    <TableCell>
                        {/* <Button onClick={() => handleRowSelect(record)}>Select</Button> */}
                    </TableCell>
                    </TableRow>
                ))}
                {results.length === 0 && (
                    <TableRow>
                    <TableCell colSpan={13}>No results found.</TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>

            </SearchResultItem>
          ))}
        </SearchResultList>
      )}
      <BottomNav />
    </SearchContainer>
  );
};

export default SearchPage;