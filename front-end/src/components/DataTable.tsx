import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

interface EventData {
  deviceId: string;
  events: number;
}

const StyledLoading = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: "2rem",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.primary.dark,
}));

// renders a table of deviceIds and events once the data is loaded
const DataTable: React.FC = () => {
  const [data, setData] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // fetch data from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/events");
        const formattedData = response.data.map((item: [string, number]) => ({
          deviceId: item[0],
          events: item[1],
        }));
        setData(formattedData);
      } catch (err) {
        setError("Failed to fetch events data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if loading, display a loading spinner
  if (loading) {
    return (
      <StyledLoading>
        <CircularProgress />
      </StyledLoading>
    );
  }

  // handle error while fetching data
  if (error) {
    return (
      <StyledLoading>
        <Alert severity="error">{error}</Alert>
      </StyledLoading>
    );
  }

  return (
    <TableContainer
      component={Paper}
      style={{
        marginTop: "1rem",
        padding: "1rem",
        borderRadius: "10px",
      }}
      elevation={3}
    >
      <Title variant="h6" gutterBottom>
        Anomaly Events Dashboard
      </Title>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Devices</StyledTableCell>
            <StyledTableCell align="center">Events</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.deviceId}>
              <StyledTableCell component="th" scope="row" align="center">
                {row.deviceId}
              </StyledTableCell>
              <StyledTableCell align="center">{row.events}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
