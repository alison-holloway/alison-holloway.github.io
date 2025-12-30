---
title: The Underground PHP and Oracle Manual
layout: portfolio_item
product: Oracle Database
doc_type: Published Book
version: Release 2.0
date: '2012-12-01'
date_completed: '2012-12-01'
featured: true
tags:
- Published Book
- PHP
- Oracle Database
- Developer Guide
- Community Evangelism
tools:
- FrameMaker
pdf_url: https://www.oracle.com/a/tech/docs/database/201212-ug-php-oracle.pdf
doc_url: http://www.oracle.com/technetwork/topics/php/underground-php-oracle-manual-098250.html
excerpt: Co-authored comprehensive technical manual bridging PHP and Oracle Database,
  freely distributed to expand Oracle's engagement with the PHP developer community.
---

## Overview

*The Underground PHP and Oracle Manual* is a comprehensive 350+ page technical book co-authored with Christopher Jones, published by Oracle Corporation and distributed freely to the developer community. This book serves as the definitive guide for PHP developers working with Oracle Database, covering everything from basic connectivity to advanced features like connection pooling, high availability, and application performance tuning.

The book was created to fill a significant gap in available documentation for PHP and Oracle integration, providing unique material about PHP's OCI8 extension and the broader PHP-Oracle ecosystem.

## Co-Author Role

As co-author alongside Christopher Jones (Principal Product Manager for PHP and Oracle Database technologies), I was responsible for:

- Writing and editing multiple chapters covering database installation, SQL tools, globalization, and testing
- Coordinating contributions from over 25 Oracle engineers and external experts
- Ensuring technical accuracy through hands-on testing of all code examples
- Structuring content for both novice and advanced developers
- Creating practical, working examples throughout the book

## Book Scope and Content

The manual covers the complete PHP-Oracle development stack across 19 comprehensive chapters:

### Foundation Chapters
- **Introduction to PHP and Oracle** - Technology overview and ecosystem
- **Getting Started with PHP** - Language syntax and development basics
- **PHP Oracle Extensions** - OCI8, PDO, and abstraction libraries

### Installation and Setup
- **Installing Oracle Database 11g Express Edition** - Step-by-step installation for Linux and Windows
- **Installing Apache HTTP Server** - Web server configuration
- **Installing and Configuring PHP** - Multiple platform support including Linux, Windows, and Oracle Solaris
- **Installing PHP on Oracle Solaris** - Dedicated chapter for Solaris-specific procedures

### Database Development Tools
- **SQL With Oracle Database** - Coverage of SQL*Plus, Oracle Application Express, and Oracle SQL Developer
- **NetBeans IDE for PHP** - Integrated development environment setup and usage

### Core PHP and Oracle Development
- **Connecting to Oracle Using OCI8** - Connection types, authentication, pooling, and performance tuning
- **Executing SQL Statements With OCI8** - Queries, DML, transactions, bind variables, and performance optimization
- **Using PL/SQL With OCI8** - Stored procedures, functions, REF CURSORS, collections, and Oracle object types
- **Using Large Objects in OCI8** - LOB and BFILE handling
- **Using XML With Oracle and PHP** - XMLType columns, XQuery, and XML DB

### Advanced Topics
- **PHP Connection Pooling and High Availability** - Database Resident Connection Pooling (DRCP), Fast Application Notification (FAN), and RAC load balancing
- **PHP and TimesTen In-Memory Database** - Integration with Oracle's in-memory database
- **PHP and Oracle Tuxedo** - Enterprise transaction processing
- **Globalization** - Multi-language support and character set handling
- **Testing PHP and the OCI8 Extension** - Quality assurance and testing methodologies

### Appendices
- Tracing OCI8 internals
- php.ini configuration parameters
- Function name references
- Obsolete extension documentation
- Comprehensive resource listings and glossary

## Documentation Challenges

### Challenge 1: Bridging Two Technical Communities

The book needed to serve both PHP developers new to Oracle and Oracle developers new to PHP. Each community had different knowledge bases, terminology, and expectations.

**Solution:** Structured the book with progressive complexity. Early chapters assume minimal knowledge of either technology, while later chapters dive deep into advanced features. Included extensive cross-references and a comprehensive glossary to help readers navigate between PHP and Oracle terminology.

### Challenge 2: Multi-Platform Coverage

PHP and Oracle run on numerous platforms (Linux variants, Windows, Oracle Solaris, Mac OS X), each with different installation procedures, configuration methods, and operational characteristics.

**Solution:** Created platform-specific installation chapters with detailed procedures for each major platform. Used conditional explanations throughout to highlight platform-specific considerations. All code examples were tested on multiple platforms to ensure portability.

### Challenge 3: Keeping Pace with Technology Evolution

Both PHP and Oracle Database undergo regular updates with new features and deprecations. The book needed to remain relevant across multiple versions.

**Solution:** Focused on fundamental concepts and stable APIs while clearly documenting version-specific features. Included compatibility matrices showing PHP version, OCI8 version, and Oracle Database version relationships. Made the book freely available online to enable updates without print distribution delays.

### Challenge 4: Coordinating Multiple Contributors

With over 25 contributors providing content on specialized topics, maintaining consistent voice, style, and technical depth was challenging.

**Solution:** Established editorial guidelines for structure, tone, and code formatting. Performed comprehensive technical and editorial review of all contributed content. Rewrote sections as needed to ensure consistency while preserving contributors' technical expertise.

## Technical Contributions Beyond Writing

### Code Development and Testing

- Created and tested over 100 working PHP code examples
- Validated all procedures on multiple platforms and Oracle versions
- Developed automation scripts for testing connection pooling and high availability features
- Built sample applications demonstrating real-world usage patterns

### Community Engagement

- Presented book content at Oracle OpenWorld and PHP conferences
- Engaged with PHP community through forums and discussion groups
- Incorporated community feedback into subsequent updates
- Responded to reader questions and technical issues

### Documentation Innovation

- Pioneered freely distributed, comprehensive technical book model at Oracle
- Established collaboration patterns for multi-author technical documentation
- Created templates and standards used by subsequent Oracle technical publications

## Target Audience

The book serves multiple audiences:

- **PHP Developers** learning Oracle Database integration
- **Oracle Developers** adopting PHP for application development
- **System Administrators** deploying PHP-Oracle stacks
- **Architects** designing scalable PHP applications with Oracle
- **Students and Educators** teaching PHP and database integration

Written to be accessible to developers with basic PHP or Oracle knowledge while providing depth for advanced users.

## Distribution and Impact

### Publication Details
- **Publisher:** Oracle Corporation
- **Release:** Version 2.0, December 2012 (updated from original 2008 release)
- **Format:** Free PDF download, 350+ pages
- **License:** Oracle copyright with free distribution rights

### Community Impact

The book has had significant impact on the PHP-Oracle community:

- **Thousands of downloads** from the Oracle Technology Network since publication
- **Community adoption** as the reference guide for PHP-Oracle development
- **Reduced barrier to entry** for PHP developers adopting Oracle Database
- **Increased Oracle adoption** in PHP development community
- **Conference presentations** and workshops based on book content
- **Frequently cited** in technical forums, Stack Overflow, and developer blogs

The freely available distribution model significantly expanded Oracle's reach in the PHP developer community, demonstrating Oracle's commitment to open source integration.

## Recognition and Professional Development

Co-authoring this book:

- **Established expertise** in PHP-Oracle integration at a global level
- **Built relationships** with PHP community leaders and Oracle engineering teams
- **Created speaking opportunities** at major international conferences (Oracle OpenWorld, PHP conferences in Germany and New York)
- **Demonstrated technical leadership** beyond traditional documentation roles
- **Influenced product direction** through direct engagement with development teams

## Technical Writing Lessons Learned

This project reinforced several key principles for technical book authorship:

1. **Community engagement matters** - Regular interaction with users identified gaps and improved content relevance
2. **Working code is essential** - Every example must be tested and functional; readers immediately lose trust with broken examples
3. **Free distribution amplifies impact** - Removing cost barriers significantly expanded reach and influence
4. **Multi-author coordination requires strong editorial leadership** - Clear guidelines and consistent review prevent stylistic fragmentation
5. **Platform diversity adds complexity** - Cross-platform validation is time-consuming but essential for credibility

## Related Work

The book built upon and complemented other Oracle PHP documentation:

- **Oracle Database Express Edition 2 Day + PHP Developer's Guide** - Introductory tutorial for building PHP applications
- **PHP-OCI8 Extension Documentation** - Technical reference for the extension
- **Oracle PHP Developer's Guide** - Database-side PHP integration

*The Underground PHP and Oracle Manual* uniquely filled the middle ground: more comprehensive than tutorials, more practical than API references, and focused specifically on the PHP-Oracle integration story.

## Legacy

The book remains a valuable resource for PHP-Oracle developers over a decade after publication. Its comprehensive coverage of fundamental concepts ensures continued relevance despite technology evolution. The success of this freely distributed model influenced Oracle's approach to community engagement and technical documentation distribution.

For developers working with PHP and Oracle Database, this book continues to be the definitive reference, bridging two powerful technologies and demonstrating how technical writing can build and strengthen developer communities.
