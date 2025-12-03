import { Link } from "react-router-dom";
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
  CheckCircle2,
  MessageCircle
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
            <a href="https://wa.me/919354720445?text=Hi%2C%20I%20want%20to%20join%20KTC%20Taekwondo%20classes" target="_blank" rel="noopener noreferrer">
              <Button variant="hero" size="lg" className="text-lg">
                Join Classes
              </Button>
            </a>
            <a href="#schedule">
              <Button variant="heroOutline" size="lg" className="text-lg">
                View Schedule
              </Button>
            </a>
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
          <div className="grid md:grid-cols-2 gap-6">
            {/* Beginner Class */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Beginners</CardTitle>
                  <Badge className="bg-accent text-accent-foreground">New Students</Badge>
                </div>
                <CardDescription className="text-base">
                  Perfect for those new to Taekwondo
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Monday - Friday</p>
                    <p className="text-sm text-muted-foreground">6:00 PM - 7:00 PM</p>
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

            {/* Intermediate & Advanced Class */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-primary">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Intermediate & Advanced</CardTitle>
                  <Badge className="bg-primary text-primary-foreground">Yellow Belt+</Badge>
                </div>
                <CardDescription className="text-base">
                  Advanced techniques, sparring & competition prep
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Calendar className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Monday - Friday</p>
                    <p className="text-sm text-muted-foreground">8:00 PM - 9:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm">Advanced kicks, poomsae, sparring & competition training</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Fee Structure</h2>
            <p className="text-xl text-muted-foreground">Simple and affordable pricing for everyone</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Admission Fee */}
            <Card className="hover:shadow-xl transition-shadow duration-300 border-2 border-primary">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Admission Fee</CardTitle>
                <div className="text-4xl font-bold text-primary">₹2,500</div>
                <CardDescription className="text-base">One-time payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Complete training uniform included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Registration & enrollment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Access to all class levels</span>
                </div>
                <a href="https://wa.me/919354720445?text=Hi%2C%20I%20want%20to%20join%20KTC%20Taekwondo%20classes" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full mt-6">
                    Join Now
                  </Button>
                </a>
              </CardContent>
            </Card>

            {/* Monthly Fee */}
            <Card className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl mb-2">Monthly Fee</CardTitle>
                <div className="text-4xl font-bold text-primary">₹1,500</div>
                <CardDescription className="text-base">per month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Unlimited class attendance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>All skill levels welcome</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span>Belt testing included</span>
                </div>
                <a href="https://wa.me/919354720445?text=Hi%2C%20I%20want%20to%20enroll%20for%20monthly%20classes" target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button className="w-full mt-6" variant="outline">
                    Enroll Now
                  </Button>
                </a>
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
            <div className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-muted/50 flex items-center justify-center p-4">
              <img 
                src={gallery1} 
                alt="Student receiving certificate at belt ceremony with Khatri sir"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-muted/50 flex items-center justify-center p-4">
              <img 
                src={gallery2} 
                alt="Outdoor training session with Khatri sir and students"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-muted/50 flex items-center justify-center p-4">
              <img 
                src={gallery3} 
                alt="Students practicing stances in the dojang"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-muted/50 flex items-center justify-center p-4">
              <img 
                src={gallery4} 
                alt="Students training on the mat"
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
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
                          Rajendra Nagar Sector 2<br />
                          Shahibabad<br />
                          Near Karan Gate Police Choki
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Phone</h3>
                        <p className="text-muted-foreground">+91 93547 20445</p>
                        <a 
                          href="https://wa.me/919354720445"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">Email</h3>
                        <p className="text-muted-foreground">bkhatri899@gmail.com</p>
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

              {/* Google Maps */}
              <a 
                href="https://www.google.com/maps/search/Rajendra+Nagar+Sector+2+Shahibabad+Near+Karan+Gate+Police+Choki"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Rajendra+Nagar+Sector+2,Shahibabad,Ghaziabad"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="KTC Club Location"
                  className="w-full h-full"
                ></iframe>
              </a>
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
            <Link 
              to="/auth" 
              className="text-xs opacity-60 hover:opacity-100 transition-opacity mt-4"
            >
              Admin Login
            </Link>
            <p className="text-xs opacity-60">
              © 2024 KTC Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
