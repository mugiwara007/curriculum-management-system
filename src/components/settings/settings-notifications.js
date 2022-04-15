import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography
} from '@mui/material';

export const SettingsNotifications = (props) => (
  <form {...props}>
    <Card>
      <CardHeader
        subheader="Manage notifications you want to recieve"
        title="Notifications"
      />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={6}
          wrap="wrap"
        >
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              Notifications
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Email"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Push Notifications"
            />
            <FormControlLabel
              control={
                <Checkbox 
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />}
              label="SMS"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Phone calls"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Events"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Reminders"
            />
          </Grid>
          <Grid
            item
            md={4}
            sm={6}
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            xs={12}
          >
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h6"
            >
              Mobile
            </Typography>
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Email"
            />
            <FormControlLabel
              control={
                <Checkbox 
                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />}
              label="Push Notifications"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="SMS"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Phone calls"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Events"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  color="primary"
                  defaultChecked
                  sx={{
                    '& .MuiSvgIcon-root': { fontSize: 30 } }}
                />
              )}
              label="Reminders"
            />
          </Grid>
        </Grid>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          variant="contained"
        >
          Save Changes
        </Button>
      </Box>
    </Card>
  </form>
);
