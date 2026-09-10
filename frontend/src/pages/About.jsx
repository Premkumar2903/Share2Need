import React from "react";
import { Link } from "react-router-dom";
import {
    Utensils,
    Search,
    PackageCheck,
    Clock3,
    Users,
    ClipboardList,
    Share2,
    Heart,
} from "lucide-react";
import "../styles/about.css";

export default function About() {
    return (
        <main className="about-page">

            {/* Hero */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <p className="about-label">ABOUT SHARE2NEED</p>

                    <h1>
                        Turning surplus food into
                        <span> meaningful meals.</span>
                    </h1>

                    <p className="about-hero-description">
                        Share2Need connects people and organizations with
                        surplus food to people who need it, making food
                        sharing simpler, more organized, and more impactful.
                    </p>
                </div>
            </section>


            {/* Problem */}
            <section className="about-section">
                <div className="section-heading">
                    <p className="about-label">THE PROBLEM</p>

                    <h2>
                        Food shouldn't go to waste when someone needs it.
                    </h2>

                    <p>
                        Every day, perfectly usable food becomes surplus from
                        homes, restaurants, events, and other sources. At the
                        same time, people struggle to access sufficient food.
                    </p>
                </div>

                <div className="problem-grid">

                    <article className="problem-card">
                        <div className="about-icon">
                            <Utensils size={28} />
                        </div>

                        <h3>Surplus Food</h3>

                        <p>
                            Extra food is often left unused after events,
                            meals, or large-scale preparation.
                        </p>
                    </article>

                    <article className="problem-card">
                        <div className="about-icon">
                            <Users size={28} />
                        </div>

                        <h3>People in Need</h3>

                        <p>
                            Many people could benefit from food that would
                            otherwise be wasted.
                        </p>
                    </article>

                    <article className="problem-card">
                        <div className="about-icon">
                            <Share2 size={28} />
                        </div>

                        <h3>The Missing Connection</h3>

                        <p>
                            The challenge is often connecting available food
                            with people who can actually use it.
                        </p>
                    </article>

                </div>
            </section>


            {/* Solution */}
            <section className="about-section solution-section">

                <div className="solution-content">

                    <div className="section-heading">
                        <p className="about-label">OUR SOLUTION</p>

                        <h2>
                            A simple bridge between surplus and need.
                        </h2>

                        <p>
                            Share2Need provides a structured platform where
                            donors can share surplus food and receivers can
                            discover and reserve what they need.
                        </p>
                    </div>

                    <div className="solution-flow">

                        <div className="flow-item">
                            <div className="flow-number">01</div>
                            <h3>Share</h3>
                            <p>
                                Donors list their available surplus food.
                            </p>
                        </div>

                        <div className="flow-arrow">→</div>

                        <div className="flow-item">
                            <div className="flow-number">02</div>
                            <h3>Discover</h3>
                            <p>
                                Receivers find food that is currently available.
                            </p>
                        </div>

                        <div className="flow-arrow">→</div>

                        <div className="flow-item">
                            <div className="flow-number">03</div>
                            <h3>Reserve</h3>
                            <p>
                                Receivers reserve the quantity they need.
                            </p>
                        </div>

                        <div className="flow-arrow">→</div>

                        <div className="flow-item">
                            <div className="flow-number">04</div>
                            <h3>Collect</h3>
                            <p>
                                Food is collected before the listing expires.
                            </p>
                        </div>

                    </div>

                </div>
            </section>


            {/* How it works */}
            <section className="about-section">

                <div className="section-heading centered-heading">
                    <p className="about-label">HOW IT WORKS</p>

                    <h2>Designed to keep food sharing simple.</h2>

                    <p>
                        The platform gives donors and receivers the tools they
                        need to coordinate food sharing.
                    </p>
                </div>

                <div className="steps-grid">

                    <article className="step-card">
                        <div className="step-icon">
                            <Utensils size={26} />
                        </div>

                        <span>01</span>

                        <h3>List Surplus Food</h3>

                        <p>
                            Donors provide details such as food type,
                            quantity, availability time, and pickup location.
                        </p>
                    </article>

                    <article className="step-card">
                        <div className="step-icon">
                            <Search size={26} />
                        </div>

                        <span>02</span>

                        <h3>Discover Food</h3>

                        <p>
                            Receivers browse available food and search for
                            listings that match their needs.
                        </p>
                    </article>

                    <article className="step-card">
                        <div className="step-icon">
                            <PackageCheck size={26} />
                        </div>

                        <span>03</span>

                        <h3>Reserve</h3>

                        <p>
                            Receivers select the quantity they need and create
                            a reservation.
                        </p>
                    </article>

                    <article className="step-card">
                        <div className="step-icon">
                            <Clock3 size={26} />
                        </div>

                        <span>04</span>

                        <h3>Collect on Time</h3>

                        <p>
                            Food remains available only during its specified
                            availability period.
                        </p>
                    </article>

                </div>
            </section>


            {/* Features */}
            <section className="about-section features-section">

                <div className="section-heading centered-heading">
                    <p className="about-label">WHAT SHARE2NEED PROVIDES</p>

                    <h2>More than just a food listing platform.</h2>
                </div>

                <div className="features-grid">

                    <article className="feature-card">
                        <div className="feature-icon">
                            <Utensils size={24} />
                        </div>

                        <div>
                            <h3>Food Listings</h3>
                            <p>
                                Donors can create and manage surplus food
                                listings.
                            </p>
                        </div>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">
                            <Search size={24} />
                        </div>

                        <div>
                            <h3>Food Discovery</h3>
                            <p>
                                Receivers can browse and search available
                                food.
                            </p>
                        </div>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">
                            <PackageCheck size={24} />
                        </div>

                        <div>
                            <h3>Quantity Reservations</h3>
                            <p>
                                Receivers can reserve only the quantity they
                                need.
                            </p>
                        </div>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">
                            <Clock3 size={24} />
                        </div>

                        <div>
                            <h3>Availability Tracking</h3>
                            <p>
                                Listings are automatically handled based on
                                their availability period.
                            </p>
                        </div>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">
                            <Users size={24} />
                        </div>

                        <div>
                            <h3>Role-Based Access</h3>
                            <p>
                                Donors and receivers have different platform
                                capabilities.
                            </p>
                        </div>
                    </article>

                    <article className="feature-card">
                        <div className="feature-icon">
                            <ClipboardList size={24} />
                        </div>

                        <div>
                            <h3>Reservation Management</h3>
                            <p>
                                Users can track and manage their reservation
                                activity.
                            </p>
                        </div>
                    </article>

                </div>
            </section>


            {/* Purpose */}
            <section className="purpose-section">

                <div className="purpose-content">

                    <div className="purpose-icon">
                        <Heart size={34} />
                    </div>

                    <p className="about-label">OUR PURPOSE</p>

                    <h2>
                        Reduce food waste by making surplus food easier to
                        share.
                    </h2>

                    <p>
                        Share2Need explores how technology can help solve a
                        practical social problem by connecting available
                        resources with real needs.
                    </p>

                    <p>
                        The goal is to create a structured, transparent, and
                        scalable food-sharing system that encourages people
                        and organizations to make better use of surplus food.
                    </p>

                </div>

            </section>


            {/* CTA */}
            <section className="about-cta">

                <div>
                    <p className="about-label">MAKE A DIFFERENCE</p>

                    <h2>Every surplus meal can make a difference.</h2>

                    <p>
                        Share what you have. Find what you need.
                    </p>
                </div>

                <div className="about-cta-actions">
                    <Link
                        to="/receiver/foods"
                        className="about-primary-button"
                    >
                        Find Food
                    </Link>

                    <Link
                        to="/register"
                        className="about-secondary-button"
                    >
                        Join Share2Need
                    </Link>
                </div>

            </section>

        </main>
    );
}