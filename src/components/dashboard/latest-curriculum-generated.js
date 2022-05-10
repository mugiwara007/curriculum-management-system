import { formatDistanceToNow, subHours } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const latestCurriculumsData = [
  {
    id: uuid(),
    name: 'Curriculum 1',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Curriculum 2',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Curriculum 3',
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: 'Curriculum 4',
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: 'Curriculum 5',
    updatedAt: subHours(Date.now(), 9)
  }
];

export const LatestCurriculumGenerated = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${latestCurriculumsData.length} in total`}
      title="Latest Curriculum Generated"
    />
    <Divider />
    <List>
      {latestCurriculumsData.map((product, i) => (
        <ListItem
          divider={i < latestCurriculumsData.length - 1}
          key={product.id}
        >
          {/* <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar> */}
          <ListItemText
            primary={product.name}
            secondary={`Updated ${formatDistanceToNow(product.updatedAt)}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box> */}
  </Card>
);
