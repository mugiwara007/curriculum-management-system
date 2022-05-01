import { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import EditIcon from '@mui/icons-material/Edit';
import { db } from 'src/firebase/firebase-auth'
import { getDocs, collection } from 'firebase/firestore';

export const SubjectListResults = () => {
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const subjectsCollectionRef = collection(db, "subjects");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getSubjects = async () => {
      const data = await getDocs(subjectsCollectionRef);
      setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getSubjects();
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedSubjectIds;

    if (event.target.checked) {
      newSelectedSubjectIds = subjects.map((subject) => subject.id);
    } else {
      newSelectedSubjectIds = [];
    }

    setSelectedSubjectIds(newSelectedSubjectIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedSubjectIds.indexOf(id);
    let newSelectedSubjectIds = [];

    if (selectedIndex === -1) {
      newSelectedSubjectIds = newSelectedSubjectIds.concat(selectedSubjectIds, id);
    } else if (selectedIndex === 0) {
      newSelectedSubjectIds = newSelectedSubjectIds.concat(selectedSubjectIds.slice(1));
    } else if (selectedIndex === selectedSubjectIds.length - 1) {
      newSelectedSubjectIds = newSelectedSubjectIds.concat(selectedSubjectIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedSubjectIds = newSelectedSubjectIds.concat(
        selectedSubjectIds.slice(0, selectedIndex),
        selectedSubjectIds.slice(selectedIndex + 1)
      );
    }

    setSelectedSubjectIds(newSelectedSubjectIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedSubjectIds.length === subjects.length}
                    color="primary"
                    indeterminate={
                      selectedSubjectIds.length > 0
                      && selectedSubjectIds.length < subjects.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Subject Code
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  LEC Units
                </TableCell>
                <TableCell>
                  LAB Units
                </TableCell>
                <TableCell>
                  Pre-Requisite
                </TableCell>
                <TableCell>
                  Co-Requisite
                </TableCell>
                <TableCell>
                  Username
                </TableCell>
                <TableCell>
                  KAC
                </TableCell>
                <TableCell>
                  Class Code
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.slice(0, limit).map((subject) => (
                <TableRow
                  hover
                  key={subject.id}
                  selected={selectedSubjectIds.indexOf(subject.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedSubjectIds.indexOf(subject.id) !== -1}
                      onChange={(event) => handleSelectOne(event, subject.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={subject.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(subject.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {subject.sub_code}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {subject.sub_desc}
                  </TableCell>
                  <TableCell>
                    {subject.sub_lec}
                  </TableCell>
                  <TableCell>
                    {subject.sub_lab}
                  </TableCell>
                  <TableCell>
                    {subject.sub_preReq}
                  </TableCell>
                  <TableCell>
                    {subject.sub_coReq}
                  </TableCell>
                  <TableCell>
                    {subject.sub_user}
                  </TableCell>
                  <TableCell>
                    {subject.sub_kac}
                  </TableCell>
                  <TableCell>
                    {subject.sub_classCode}
                  </TableCell>
                  <TableCell>
                    <Button
                    startIcon={(<EditIcon fontSize="small" />)}
                    variant="outlined"
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={subjects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
