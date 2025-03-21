import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">System Settings</h1>
        <p className="text-muted-foreground">
          Configure your education management system settings.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>
                Update your institution details and contact information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institution-name">Institution Name</Label>
                  <Input
                    id="institution-name"
                    defaultValue="Example University"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution-code">Institution Code</Label>
                  <Input id="institution-code" defaultValue="EXU-2025" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institution-address">Address</Label>
                <Textarea
                  id="institution-address"
                  defaultValue="123 University Ave, Education City, EC 12345"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Administrator Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    defaultValue="admin@example.edu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    defaultValue="(555) 123-4567"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Year Settings</CardTitle>
              <CardDescription>
                Configure the current academic year and term dates.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academic-year">Current Academic Year</Label>
                  <Select defaultValue="2024-2025">
                    <SelectTrigger id="academic-year">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023-2024">2023-2024</SelectItem>
                      <SelectItem value="2024-2025">2024-2025</SelectItem>
                      <SelectItem value="2025-2026">2025-2026</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-term">Current Term</Label>
                  <Select defaultValue="spring">
                    <SelectTrigger id="current-term">
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fall">Fall</SelectItem>
                      <SelectItem value="winter">Winter</SelectItem>
                      <SelectItem value="spring">Spring</SelectItem>
                      <SelectItem value="summer">Summer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="term-start">Term Start Date</Label>
                  <Input
                    id="term-start"
                    type="date"
                    defaultValue="2025-01-15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="term-end">Term End Date</Label>
                  <Input id="term-end" type="date" defaultValue="2025-05-15" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure when to send automated email notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="email-grades"
                  className="flex flex-col space-y-1"
                >
                  <span>Grade Updates</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Send notifications when grades are posted
                  </span>
                </Label>
                <Switch id="email-grades" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="email-assignments"
                  className="flex flex-col space-y-1"
                >
                  <span>Assignment Deadlines</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Send reminders before assignment due dates
                  </span>
                </Label>
                <Switch id="email-assignments" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="email-announcements"
                  className="flex flex-col space-y-1"
                >
                  <span>Announcements</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Send notifications for new system announcements
                  </span>
                </Label>
                <Switch id="email-announcements" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="email-registration"
                  className="flex flex-col space-y-1"
                >
                  <span>Registration Updates</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Send notifications for course registration changes
                  </span>
                </Label>
                <Switch id="email-registration" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SMS Notifications</CardTitle>
              <CardDescription>
                Configure text message alerts for urgent communications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="sms-enabled"
                  className="flex flex-col space-y-1"
                >
                  <span>Enable SMS Notifications</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Allow the system to send text messages
                  </span>
                </Label>
                <Switch id="sms-enabled" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sms-provider">SMS Provider</Label>
                <Select defaultValue="twilio">
                  <SelectTrigger id="sms-provider">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="twilio">Twilio</SelectItem>
                    <SelectItem value="aws-sns">AWS SNS</SelectItem>
                    <SelectItem value="custom">Custom Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sms-api-key">API Key</Label>
                <Input id="sms-api-key" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save SMS Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>
                Customize the appearance of your education portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="color-theme">Color Theme</Label>
                <Select defaultValue="system">
                  <SelectTrigger id="color-theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="primary-color">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-upload">Institution Logo</Label>
                <Input id="logo-upload" type="file" />
                <p className="text-xs text-muted-foreground">
                  Recommended size: 240x80px. Max file size: 2MB.
                </p>
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="show-welcome"
                  className="flex flex-col space-y-1"
                >
                  <span>Welcome Banner</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Show welcome message on dashboard
                  </span>
                </Label>
                <Switch id="show-welcome" defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom CSS</CardTitle>
              <CardDescription>
                Add custom styling to your portal (advanced).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="custom-css"
                className="font-mono text-sm h-40"
                placeholder="/* Add your custom CSS here */"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Changes will be applied after saving and refreshing the page.
              </p>
            </CardContent>
            <CardFooter>
              <Button>Save Custom CSS</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure authentication and security policies.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="session-timeout">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue="30"
                  min="5"
                  max="120"
                />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="two-factor" className="flex flex-col space-y-1">
                  <span>Two-Factor Authentication</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Require 2FA for administrator accounts
                  </span>
                </Label>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="flex items-center justify-between space-x-2">
                <Label
                  htmlFor="password-policy"
                  className="flex flex-col space-y-1"
                >
                  <span>Strong Password Policy</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Enforce complex passwords for all users
                  </span>
                </Label>
                <Switch id="password-policy" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                <Input
                  id="password-expiry"
                  type="number"
                  defaultValue="90"
                  min="30"
                  max="365"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Security Settings</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
              <CardDescription>
                Configure system backup and maintenance settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backup-frequency">
                  Automated Backup Frequency
                </Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="backup-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance-window">Maintenance Window</Label>
                <Input
                  id="maintenance-window"
                  type="text"
                  defaultValue="Sunday 2:00 AM - 4:00 AM"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Maintenance Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
