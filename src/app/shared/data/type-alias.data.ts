import { ValidationErrors } from "@angular/forms";
import { CellPhoneContactDTO, EmailContactDTO, IndividualPartyDTO, OrganizationPartyDTO, PhoneContactDTO, PhysicalAddressContactDTO, SocialIdContactDTO, WebsiteContactDTO } from "../dto";
import { ValidOptionsConstraintDTO, ValidRangesConstraintDTO } from "../dto/feature-constraint.dto";
import { AdvancedFilter, DeepFilter, Filter } from "../models";

/**
 * @description Base structure for simple object with string value 
 */
export type simpleObject = { [key: string]: string };

/**
 * @description There are two type of product; Product and ProductTemplate
 */
export type productType = 'Product' | 'ProductTamplate';

/**
 * @description Filter operations
 */
export type filterOperator = 'eq' |
    'neq' |
    'lt' |
    'lte' |
    'gt' |
    'gte' |
    'in' |
    'notIn' |
    'startWith' |
    'endWith' |
    'contains';

/**
* @description Logic to combine filters
*/
export type filterLogic = 'or' | 'and';

/**
 * @description There are three kink of filters; Filter, DeepFilter and AdvancedFilter
 */
export type filter = Filter | DeepFilter | AdvancedFilter;

/**
 * @description A function with an structure suitable for returning ValiationMessage
 */
export type validationMessageFunction = (name: string, error: ValidationErrors) => string;

/**
 * @description Safe string type for type of Party
 */
export type partyType = 'IndividualParty' | 'OrganizationParty';

export type party = IndividualPartyDTO | OrganizationPartyDTO;

/**
 * @description A type for two type of constraits in productTemplate.featureDefinition 
 */
export type featureConstraint = ValidOptionsConstraintDTO | ValidRangesConstraintDTO;

export type applicationLanguage = 'en' | 'tr';

export type productTemplates = 'MDF' | 'Tomruk';

export type contact = CellPhoneContactDTO | EmailContactDTO |
    PhoneContactDTO | PhysicalAddressContactDTO
    | SocialIdContactDTO | WebsiteContactDTO;