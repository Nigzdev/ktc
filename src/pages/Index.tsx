import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Shield, 
  Target, 
  Heart,
  CheckCircle2
} from "lucide-react";

// Import images
import heroImage from "@/assets/hero-group.jpg";
import instructorImage from "@/assets/instructor-belt.jpg";
import gallery1 from "@/assets/gallery-certificate.jpg";
import gallery2 from "@/assets/gallery-outdoor.jpg";
import gallery3 from "@/assets/gallery-training.jpg";
import gallery4 from "@/assets/gallery-practice.jpg";
import logo from "@/assets/ktc-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-5xl animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6">
            Empowering Students Through <span className="text-primary">Taekwondo</span> Excellence
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground mb-4 font-semibold">
            Discipline • Confidence • Fitness • Self-Defense
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button variant="hero" size="lg" className="text-lg">
              Join Classes
            </Button>
            <Button variant="heroOutline" size="lg" className="text-lg">
              View Schedule
            </Button>
          </div>
        </div>
      </section>

      {/* About Instructor Section */}
      <section id="about" className="section-padding bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src={instructorImage} 
                alt="Khatri sir teaching belt tying technique to student"
                className="rounded-lg shadow-2xl w-full h-auto object-contain"
              />
            </div>
            <div className="space-y-6">
              <Badge className="bg-primary text-primary-foreground">Master Instructor</Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Meet Your Instructor
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  <strong className="text-foreground">Khatri sir</strong> is a 3rd Dan black belt with extensive teaching experience. 
                  Certified by the World Taekwondo Federation, Khatri sir has trained hundreds of students from beginners to championship competitors.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    3rd Dan Black Belt
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    WTF Certified
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Expert Instructor
                  </Badge>
                </div>
                <p className="pt-4 border-l-4 border-primary pl-4 italic">
                  "My mission is to empower every student with the skills, confidence, and character that Taekwondo builds. 
                  Whether you're here for fitness, self-defense, or competition, I'll guide you on your journey to excellence."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Schedule Section */}
      <section id="schedule" className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Class Schedule</h2>
            <p className="text-xl text-muted-foreground">Choose the class that fits your level and schedule</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Beginner Class */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Beginner</CardTitle>
                  <Badge className="bg-accent text-accent-foreground">Ages 6+</Badge>
                </div>
                <CardDescription className="text-base">
                  Perfect for those new to Taekwondo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Monday & Wednesday</p>
                    <p className="text-sm text-muted-foreground">5:00 PM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm">Basic stances, blocks, kicks, and forms</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Intermediate Class */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Intermediate</CardTitle>
                  <Badge className="bg-primary text-primary-foreground">Yellow Belt+</Badge>
                </div>
                <CardDescription className="text-base">
                  Advancing techniques and sparring
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Tuesday & Thursday</p>
                    <p className="text-sm text-muted-foreground">6:00 PM - 7:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm">Advanced kicks, poomsae, and light sparring</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Class */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Advanced</CardTitle>
                  <Badge className="bg-secondary text-secondary-foreground">Blue Belt+</Badge>
                </div>
                <CardDescription className="text-base">
                  Competition prep and mastery
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Monday, Wednesday, Friday</p>
                    <p className="text-sm text-muted-foreground">7:30 PM - 9:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm">Competition sparring, board breaking, mastery</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership Plans Section */}
      <section id="membership" className="section-padding bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Membership Plans</h2>
            <p className="text-xl text-muted-foreground">Flexible options to fit your commitment level</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Monthly Plan */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Monthly</CardTitle>
                <div className="text-4xl font-bold text-primary">$99</div>
                <CardDescription className="text-base">per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Unlimited class attendance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Access to all equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Belt testing included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>No long-term commitment</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>

            {/* Quarterly Plan */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-2 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-accent text-accent-foreground text-sm px-4 py-1">
                  BEST VALUE
                </Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Quarterly</CardTitle>
                <div className="text-4xl font-bold text-primary">$259</div>
                <CardDescription className="text-base">3 months • Save $38</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Everything in Monthly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Free training uniform</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Private lesson credit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>13% savings</span>
                </div>
                <Button className="w-full mt-6">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>

            {/* Annual Plan */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Annual</CardTitle>
                <div className="text-4xl font-bold text-primary">$899</div>
                <CardDescription className="text-base">12 months • Save $289</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Everything in Quarterly</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Premium sparring gear</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>2 private lessons/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>24% savings</span>
                </div>
                <Button className="w-full mt-6" variant="outline">
                  Enroll Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Student Achievements Section */}
      <section className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Student Achievements</h2>
            <p className="text-xl text-muted-foreground">Celebrating excellence and dedication</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary">150+</div>
              <p className="text-lg text-muted-foreground">Belts Earned</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent">45</div>
              <p className="text-lg text-muted-foreground">Tournament Wins</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary">200+</div>
              <p className="text-lg text-muted-foreground">Active Students</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center">
                <Heart className="w-10 h-10 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent">98%</div>
              <p className="text-lg text-muted-foreground">Parent Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="section-padding bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
            <p className="text-xl text-muted-foreground">Moments from our training sessions and ceremonies</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img 
                src={gallery1} 
                alt="Student receiving certificate at belt ceremony with Khatri sir"
                className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img 
                src={gallery2} 
                alt="Outdoor training session with Khatri sir and students"
                className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img 
                src={gallery3} 
                alt="Students practicing stances in the dojang"
                className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img 
                src={gallery4} 
                alt="Students training on the mat"
                className="w-full h-80 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">Ready to start your Taekwondo journey?</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>We'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Input placeholder="Your Name" className="w-full" />
                  </div>
                  <div>
                    <Input placeholder="Phone Number" type="tel" className="w-full" />
                  </div>
                  <div>
                    <Input placeholder="Email Address" type="email" className="w-full" />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Tell us about your interest in Taekwondo..." 
                      className="w-full min-h-32"
                    />
                  </div>
                  <Button className="w-full" size="lg">
                    Submit Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          123 Martial Arts Way<br />
                          Suite 100<br />
                          Your City, ST 12345
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                        <p className="text-muted-foreground">(555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-muted-foreground">info@tkdclub.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Hours</h3>
                        <p className="text-muted-foreground">
                          Monday - Friday: 5:00 PM - 9:00 PM<br />
                          Saturday: 9:00 AM - 2:00 PM<br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Maps Embed */}
              <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7471628890844!2d77.34616207549856!3d28.577464875698307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce4f7fb3a20dd%3A0x9e7c8b0c5b0c5b0c!2sKhatri%20Taekwondo%20Club!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KTC Club Location"
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col items-center gap-6">
            <img src={logo} alt="KTC Club Logo" className="w-20 h-20" />
            <div className="text-center">
              <p className="text-xl font-bold mb-2">KTC Club</p>
              <p className="text-sm opacity-80 mb-1">Khatri Taekwondo Club</p>
              <p className="text-sm opacity-80">
                Building character, confidence, and champions since 2005
              </p>
            </div>
            <p className="text-xs opacity-60 mt-4">
              © 2024 KTC Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
