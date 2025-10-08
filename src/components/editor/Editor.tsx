import React from "react";
import SideNav from "./SideNav";

const Editor: React.FC = () => {
    // Internal styles using CSS variables
    const styles = {
        container: {
            display: 'flex',
            width: '100%',
            height: '100vh',
            overflow: 'hidden' as const,
        },
        content: {
            flex: 1,
            marginLeft: '280px',
            overflowY: 'auto' as const,
            backgroundColor: `hsl(var(--bg-secondary))`,
            transition: 'background-color 0.3s ease',
        },
        previewArea: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
        },
        title: {
            fontSize: '2rem',
            fontWeight: 'bold' as const,
            color: `hsl(var(--text-primary))`,
            marginBottom: '1rem',
            transition: 'color 0.3s ease',
        },
        message: {
            color: `hsl(var(--text-secondary))`,
            marginBottom: '2rem',
            transition: 'color 0.3s ease',
        },
        section: {
            backgroundColor: `hsl(var(--bg-primary))`,
            border: `1px solid hsl(var(--border-light))`,
            borderRadius: '8px',
            padding: '3rem 2rem',
            marginBottom: '2rem',
            minHeight: '400px',
            scrollMarginTop: '2rem',
            transition: 'background-color 0.3s ease, border-color 0.3s ease',
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontWeight: '600' as const,
            color: `hsl(var(--primary))`,
            marginBottom: '1rem',
            transition: 'color 0.3s ease',
        },
        sectionText: {
            color: `hsl(var(--text-secondary))`,
            lineHeight: 1.6,
            transition: 'color 0.3s ease',
        },
    };

    return (
        <div style={styles.container}>
            <SideNav />
            <div style={styles.content}>
                <div style={styles.previewArea}>
                    <h1 style={styles.title}>Website Preview</h1>
                    <p style={styles.message}>
                        Preview sections will appear here. Click on sections in the sidebar to navigate.
                    </p>

                    {/* Placeholder sections for scroll testing */}
                    <section id="hero" style={styles.section}>
                        <h2 style={styles.sectionTitle}>Hero Section</h2>
                        <p style={styles.sectionText}>This is the hero section of your landing page.</p>
                    </section>

                    <section id="about" style={styles.section}>
                        <h2 style={styles.sectionTitle}>About Section</h2>
                        <p style={styles.sectionText}>This is the about section of your landing page.</p>
                    </section>

                    <section id="services" style={styles.section}>
                        <h2 style={styles.sectionTitle}>Services Section</h2>
                        <p style={styles.sectionText}>This is the services section of your landing page.</p>
                    </section>

                    <section id="features" style={styles.section}>
                        <h2 style={styles.sectionTitle}>Features Section</h2>
                        <p style={styles.sectionText}>This is the features section of your landing page.</p>
                    </section>

                    <section id="contact" style={styles.section}>
                        <h2 style={styles.sectionTitle}>Contact Section</h2>
                        <p style={styles.sectionText}>This is the contact section of your landing page.</p>
                    </section>

                    <section id="footer" style={styles.section}>
                        <h2 style={styles.sectionTitle}>Footer Section</h2>
                        <p style={styles.sectionText}>This is the footer section of your landing page.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Editor;
